package com.ALL_in_one.collegepartner.service;

import com.ALL_in_one.collegepartner.dto.*;
import com.ALL_in_one.collegepartner.entity.*;
import com.ALL_in_one.collegepartner.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Pattern;

@Service @RequiredArgsConstructor
public class CollegeWalletService {
    private final CollegePartnerAccountRepository accounts;
    private final CollegePartnerWalletRepository wallets;
    private final CollegeWalletTransactionRepository transactions;
    private final CollegeWalletSettingsRepository settingsRepository;
    private final CollegeStudentEnquiryRepository enquiries;
    private final StudentDataAccessLogRepository accessLogs;
    private static final BigDecimal ZERO = new BigDecimal("0.00");
    private static final Pattern IMAGE_DATA = Pattern.compile("^data:image/(png|jpeg|webp);base64,[A-Za-z0-9+/=\\r\\n]+$");

    @Transactional
    public Map<String,Object> partnerWallet(String username) {
        CollegePartnerAccount account = lockedAccount(username);
        CollegePartnerWallet wallet = ensureWallet(account);
        return walletView(account, wallet, true);
    }

    @Transactional
    public Map<String,Object> requestDeposit(String username, WalletDepositRequest request) {
        CollegePartnerAccount account = lockedAccount(username);
        ensureWallet(account);
        String reference = request.paymentReference().trim().toUpperCase(Locale.ROOT);
        if (reference.length() < 6) throw new IllegalArgumentException("Enter the bank or UPI transaction reference (at least 6 characters).");
        if (transactions.existsByPaymentReferenceIgnoreCase(reference)) throw new IllegalArgumentException("This payment reference has already been submitted.");
        CollegeWalletTransaction item = new CollegeWalletTransaction();
        item.setAccount(account); item.setTransactionType("DEPOSIT_REQUEST"); item.setAmount(money(request.amount()));
        item.setStatus("PENDING"); item.setPaymentReference(reference); item.setNote(clean(request.note())); item.setActor(username);
        item = transactions.save(item);
        return transactionView(item, account.getInstitution().getName());
    }

    @Transactional
    public Map<String,Object> unlock(String username, WalletUnlockRequest request) {
        CollegePartnerAccount account = lockedAccount(username);
        CollegePartnerWallet wallet = ensureWallet(account);
        LinkedHashSet<Long> ids = new LinkedHashSet<>(request.enquiryIds());
        if (ids.size() > 100) throw new IllegalArgumentException("You can unlock up to 100 enquiries at a time.");
        List<CollegeStudentEnquiry> selected = new ArrayList<>();
        List<CollegeStudentEnquiry> newUnlocks = new ArrayList<>();
        for (Long id : ids) {
            if (id == null) throw new IllegalArgumentException("Invalid enquiry selected.");
            CollegeStudentEnquiry enquiry = enquiries.findById(id).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
            if (!Objects.equals(enquiry.getInstitution().getId(), account.getInstitution().getId())) throw new IllegalArgumentException("Enquiry not found.");
            if (!hasContactConsent(enquiry)) throw new IllegalArgumentException("One or more enquiries cannot be unlocked because student contact consent is missing or was revoked.");
            selected.add(enquiry);
            if (transactions.findByAccount_IdAndEnquiry_IdAndTransactionTypeAndStatus(account.getId(), id, "LEAD_UNLOCK", "COMPLETED").isEmpty()) newUnlocks.add(enquiry);
        }
        CollegeWalletSettings settings = settings();
        BigDecimal unitPrice = money(settings.getPricePerEnquiry());
        if (!newUnlocks.isEmpty() && unitPrice.signum() <= 0) throw new IllegalArgumentException("The administrator has not configured a price per enquiry yet.");
        BigDecimal total = unitPrice.multiply(BigDecimal.valueOf(newUnlocks.size())).setScale(2);
        if (wallet.getBalance().compareTo(total) < 0) throw new IllegalArgumentException("Insufficient wallet balance. Add funds before unlocking these enquiries.");
        BigDecimal balance = wallet.getBalance();
        for (CollegeStudentEnquiry enquiry : newUnlocks) {
            balance = balance.subtract(unitPrice);
            CollegeWalletTransaction charge = new CollegeWalletTransaction();
            charge.setAccount(account); charge.setEnquiry(enquiry); charge.setTransactionType("LEAD_UNLOCK");
            charge.setAmount(unitPrice.negate()); charge.setBalanceAfter(balance); charge.setStatus("COMPLETED"); charge.setActor(username);
            charge.setNote("Enquiry unlocked"); transactions.save(charge);
            accessLogs.save(new StudentDataAccessLog(account, enquiry, username));
        }
        if (!newUnlocks.isEmpty()) {
            wallet.setBalance(balance); wallet.setTotalSpent(wallet.getTotalSpent().add(total)); wallets.save(wallet);
        }
        List<Map<String,Object>> result = selected.stream().map(e -> enquiryView(account, e, true)).toList();
        Map<String,Object> response = new LinkedHashMap<>(); response.put("charged", total); response.put("newlyUnlocked", newUnlocks.size());
        response.put("alreadyUnlocked", selected.size() - newUnlocks.size()); response.put("balance", wallet.getBalance()); response.put("enquiries", result);
        return response;
    }

    @Transactional
    public Map<String,Object> adminSettings() { return settingsView(settings()); }

    @Transactional
    public Map<String,Object> updateSettings(WalletSettingsRequest request, String admin) {
        CollegeWalletSettings current = settingsRepository.findById(1L).orElseGet(() -> { CollegeWalletSettings value = new CollegeWalletSettings(); value.setId(1L); value.setPricePerEnquiry(ZERO); return value; });
        if (request.pricePerEnquiry() != null) current.setPricePerEnquiry(money(request.pricePerEnquiry()));
        current.setUpiId(clean(request.upiId())); current.setPaymentInstructions(clean(request.paymentInstructions()));
        if (Boolean.TRUE.equals(request.removeQrImage())) { current.setQrImageData(null); current.setQrImageContentType(null); }
        if (request.qrImageData() != null && !request.qrImageData().isBlank()) {
            String data = request.qrImageData().trim();
            if (data.length() > 2_100_000 || !IMAGE_DATA.matcher(data).matches()) throw new IllegalArgumentException("QR image must be a PNG, JPG or WebP image no larger than 1.5 MB.");
            String contentType = request.qrImageContentType();
            if (contentType == null || !Set.of("image/png", "image/jpeg", "image/webp").contains(contentType.toLowerCase(Locale.ROOT))) throw new IllegalArgumentException("Unsupported QR image type.");
            current.setQrImageData(data); current.setQrImageContentType(contentType.toLowerCase(Locale.ROOT));
        }
        current.setUpdatedBy(admin);
        return settingsView(settingsRepository.save(current));
    }

    @Transactional
    public Map<String,Object> reviewDeposit(Long transactionId, WalletDecisionRequest request, String admin) {
        CollegeWalletTransaction deposit = transactions.findByIdForUpdate(transactionId).orElseThrow(() -> new IllegalArgumentException("Deposit request not found."));
        if (!"DEPOSIT_REQUEST".equals(deposit.getTransactionType()) || !"PENDING".equals(deposit.getStatus())) throw new IllegalArgumentException("This deposit request has already been reviewed.");
        String decision = request.decision().trim().toUpperCase(Locale.ROOT);
        if (!Set.of("APPROVE", "REJECT").contains(decision)) throw new IllegalArgumentException("Choose approve or reject.");
        CollegePartnerAccount account = accounts.findByIdForUpdate(deposit.getAccount().getId()).orElseThrow(() -> new IllegalArgumentException("Institution account not found."));
        CollegePartnerWallet wallet = ensureWallet(account);
        deposit.setDecidedBy(admin); deposit.setDecidedAt(LocalDateTime.now());
        deposit.setNote(appendNote(deposit.getNote(), request.note()));
        if ("APPROVE".equals(decision)) {
            BigDecimal newBalance = wallet.getBalance().add(deposit.getAmount());
            wallet.setBalance(newBalance); wallet.setTotalAdded(wallet.getTotalAdded().add(deposit.getAmount())); wallets.save(wallet);
            deposit.setStatus("APPROVED"); transactions.save(deposit);
            CollegeWalletTransaction credit = new CollegeWalletTransaction(); credit.setAccount(account); credit.setTransactionType("DEPOSIT_CREDIT");
            credit.setAmount(deposit.getAmount()); credit.setBalanceAfter(newBalance); credit.setStatus("COMPLETED"); credit.setActor(admin);
            credit.setRelatedTransactionId(deposit.getId()); credit.setNote("Verified deposit · " + deposit.getPaymentReference()); transactions.save(credit);
        } else { deposit.setStatus("REJECTED"); transactions.save(deposit); }
        return transactionView(deposit, account.getInstitution().getName());
    }

    @Transactional
    public Map<String,Object> adminAdjust(Long accountId, WalletAdjustmentRequest request, String admin) {
        CollegePartnerAccount account = accounts.findByIdForUpdate(accountId).orElseThrow(() -> new IllegalArgumentException("College partner not found."));
        CollegePartnerWallet wallet = ensureWallet(account);
        BigDecimal amount = money(request.amount());
        if (amount.signum() == 0) throw new IllegalArgumentException("Adjustment amount cannot be zero.");
        BigDecimal balance = wallet.getBalance().add(amount);
        if (balance.signum() < 0) throw new IllegalArgumentException("This adjustment would make the wallet balance negative.");
        if (amount.signum() > 0) wallet.setTotalAdded(wallet.getTotalAdded().add(amount)); else wallet.setTotalSpent(wallet.getTotalSpent().add(amount.abs()));
        wallet.setBalance(balance); wallets.save(wallet);
        CollegeWalletTransaction entry = new CollegeWalletTransaction(); entry.setAccount(account); entry.setTransactionType("MANUAL_ADJUSTMENT");
        entry.setAmount(amount); entry.setBalanceAfter(balance); entry.setStatus("COMPLETED"); entry.setActor(admin); entry.setDecidedBy(admin);
        entry.setDecidedAt(LocalDateTime.now()); entry.setNote(request.reason().trim());
        return transactionView(transactions.save(entry), account.getInstitution().getName());
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminBalances() {
        return accounts.findAll().stream().map(account -> {
            CollegePartnerWallet wallet = wallets.findByAccount_Id(account.getId()).orElse(null);
            Map<String,Object> row = new LinkedHashMap<>(); row.put("accountId", account.getId()); row.put("institutionId", account.getInstitution().getId());
            row.put("institution", account.getInstitution().getName()); row.put("username", account.getUsername()); row.put("active", account.isActive());
            row.put("balance", wallet == null ? ZERO : wallet.getBalance()); row.put("totalAdded", wallet == null ? ZERO : wallet.getTotalAdded());
            row.put("totalSpent", wallet == null ? ZERO : wallet.getTotalSpent()); return row;
        }).toList();
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminDeposits(String status) {
        String normalized = status == null || status.isBlank() ? "PENDING" : status.trim().toUpperCase(Locale.ROOT);
        if (!Set.of("PENDING", "APPROVED", "REJECTED", "ALL").contains(normalized)) throw new IllegalArgumentException("Unsupported deposit filter.");
        List<CollegeWalletTransaction> items = "ALL".equals(normalized) ? transactions.findAll().stream().filter(t -> "DEPOSIT_REQUEST".equals(t.getTransactionType())).sorted(Comparator.comparing(CollegeWalletTransaction::getCreatedAt).reversed()).toList() : transactions.findDepositRequests(normalized);
        return items.stream().map(t -> transactionView(t, t.getAccount().getInstitution().getName())).toList();
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminTransactions() { return transactions.findWalletActivity().stream().map(t -> transactionView(t, t.getAccount().getInstitution().getName())).toList(); }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminUnlockedLeads() {
        return transactions.findUnlockedLeads().stream().map(t -> {
            Map<String,Object> row = transactionView(t, t.getAccount().getInstitution().getName());
            row.put("enquiryId", t.getEnquiry() == null ? null : t.getEnquiry().getId()); row.put("student", t.getEnquiry() == null ? "—" : t.getEnquiry().getStudentName());
            row.put("course", t.getEnquiry() == null ? "—" : t.getEnquiry().getCourse()); return row;
        }).toList();
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> partnerEnquiries(String username) {
        CollegePartnerAccount account = account(username);
        return enquiries.findByInstitution_IdOrderByCreatedAtDesc(account.getInstitution().getId()).stream().map(e -> enquiryView(account, e, false)).toList();
    }

    @Transactional(readOnly = true)
    public Map<String,Object> partnerEnquiryDetails(String username, Long enquiryId) {
        CollegePartnerAccount account = account(username);
        CollegeStudentEnquiry enquiry = enquiries.findById(enquiryId).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        if (!Objects.equals(enquiry.getInstitution().getId(), account.getInstitution().getId())) throw new IllegalArgumentException("Enquiry not found.");
        if (!isUnlocked(account.getId(), enquiryId)) throw new IllegalArgumentException("Unlock this enquiry with your wallet to view student details.");
        return enquiryView(account, enquiry, true);
    }

    @Transactional(readOnly = true)
    public boolean isUnlocked(Long accountId, Long enquiryId) {
        return transactions.findByAccount_IdAndEnquiry_IdAndTransactionTypeAndStatus(accountId, enquiryId, "LEAD_UNLOCK", "COMPLETED").isPresent();
    }

    private Map<String,Object> walletView(CollegePartnerAccount account, CollegePartnerWallet wallet, boolean withHistory) {
        Map<String,Object> result = new LinkedHashMap<>(); result.put("balance", wallet.getBalance()); result.put("totalAdded", wallet.getTotalAdded());
        result.put("totalSpent", wallet.getTotalSpent()); result.put("totalUnlocked", transactions.findByAccount_IdAndTransactionTypeAndStatus(account.getId(), "LEAD_UNLOCK", "COMPLETED").size());
        CollegeWalletSettings settings = settings(); result.put("pricePerEnquiry", settings.getPricePerEnquiry()); result.put("upiId", settings.getUpiId());
        result.put("paymentInstructions", settings.getPaymentInstructions()); result.put("qrImageData", settings.getQrImageData()); result.put("qrImageContentType", settings.getQrImageContentType());
        if (withHistory) result.put("transactions", transactions.findByAccount_IdOrderByCreatedAtDesc(account.getId()).stream().map(t -> transactionView(t, null)).toList());
        return result;
    }

    private Map<String,Object> enquiryView(CollegePartnerAccount account, CollegeStudentEnquiry enquiry, boolean includeDetailsIfUnlocked) {
        boolean unlocked = isUnlocked(account.getId(), enquiry.getId());
        boolean consent = hasContactConsent(enquiry);
        boolean reveal = unlocked && consent && includeDetailsIfUnlocked;
        Map<String,Object> row = new LinkedHashMap<>(); row.put("id", enquiry.getId()); row.put("date", enquiry.getCreatedAt()); row.put("source", enquiry.getLeadSource()); row.put("status", enquiry.getStatus());
        row.put("priority", enquiry.getPriority()); row.put("assigned", enquiry.getAssignedBy() != null);
        row.put("locked", !reveal); row.put("unlocked", unlocked && consent); row.put("previouslyUnlocked", unlocked); row.put("eligibleForUnlock", consent && !unlocked);
        row.put("student", reveal ? enquiry.getStudentName() : "Locked enquiry"); row.put("contact", reveal ? Objects.toString(enquiry.getStudentPhone(), "") : "Locked");
        row.put("email", reveal ? enquiry.getStudentEmail() : "Locked"); row.put("course", reveal ? Objects.toString(enquiry.getCourse(), "") : "Locked until unlocked");
        if (reveal) {
            row.put("message", enquiry.getMessage()); row.put("qualification", enquiry.getCurrentQualification()); row.put("city", enquiry.getCity());
            row.put("state", enquiry.getState()); row.put("degree", enquiry.getPreferredDegree()); row.put("studyMode", enquiry.getStudyMode());
            row.put("preferredCountry", enquiry.getPreferredCountry()); row.put("alternativePhone", enquiry.getAlternativePhone()); row.put("consentGiven", true);
        } else row.put("consentGiven", consent);
        return row;
    }

    private Map<String,Object> transactionView(CollegeWalletTransaction item, String institution) {
        Map<String,Object> row = new LinkedHashMap<>(); row.put("id", item.getId()); row.put("institution", institution);
        row.put("transactionType", item.getTransactionType()); row.put("amount", item.getAmount()); row.put("balanceAfter", item.getBalanceAfter());
        row.put("status", item.getStatus()); row.put("paymentReference", item.getPaymentReference()); row.put("note", item.getNote());
        row.put("actor", item.getActor()); row.put("decidedBy", item.getDecidedBy()); row.put("date", item.getCreatedAt()); row.put("decidedAt", item.getDecidedAt());
        return row;
    }

    private CollegePartnerWallet ensureWallet(CollegePartnerAccount account) {
        return wallets.findByAccountIdForUpdate(account.getId()).orElseGet(() -> {
            CollegePartnerWallet wallet = new CollegePartnerWallet(); wallet.setAccount(account); wallet.setBalance(ZERO); wallet.setTotalAdded(ZERO); wallet.setTotalSpent(ZERO);
            return wallets.save(wallet);
        });
    }

    private CollegeWalletSettings settings() {
        return settingsRepository.findById(1L).orElseGet(() -> { CollegeWalletSettings value = new CollegeWalletSettings(); value.setId(1L); value.setPricePerEnquiry(ZERO); return value; });
    }

    private CollegePartnerAccount lockedAccount(String username) { return accounts.findByUsernameForUpdate(username).filter(CollegePartnerAccount::isActive).orElseThrow(() -> new IllegalArgumentException("Active college partner not found.")); }
    private CollegePartnerAccount account(String username) { return accounts.findByUsername(username).filter(CollegePartnerAccount::isActive).orElseThrow(() -> new IllegalArgumentException("Active college partner not found.")); }
    private boolean hasContactConsent(CollegeStudentEnquiry enquiry) { return enquiry.isConsentGiven() && enquiry.getConsentAt() != null && "INSTITUTION_CONTACT".equals(enquiry.getConsentScope()) && enquiry.getContactConsentRevokedAt() == null; }
    private BigDecimal money(BigDecimal value) { return value == null ? ZERO : value.setScale(2, java.math.RoundingMode.HALF_UP); }
    private String clean(String value) { return value == null || value.isBlank() ? null : value.trim(); }
    private String appendNote(String prior, String next) { String a = clean(prior), b = clean(next); if (a == null) return b; if (b == null) return a; return (a + " · Admin: " + b).substring(0, Math.min(1000, (a + " · Admin: " + b).length())); }
    private Map<String,Object> settingsView(CollegeWalletSettings value) {
        Map<String,Object> row = new LinkedHashMap<>(); row.put("pricePerEnquiry", value.getPricePerEnquiry()); row.put("upiId", value.getUpiId());
        row.put("paymentInstructions", value.getPaymentInstructions()); row.put("qrImageData", value.getQrImageData()); row.put("qrImageContentType", value.getQrImageContentType());
        row.put("updatedBy", value.getUpdatedBy()); row.put("updatedAt", value.getUpdatedAt()); return row;
    }
}

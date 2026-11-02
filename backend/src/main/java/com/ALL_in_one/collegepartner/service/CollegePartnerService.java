package com.ALL_in_one.collegepartner.service;

import com.ALL_in_one.collegepartner.dto.*;
import com.ALL_in_one.collegepartner.entity.*;
import com.ALL_in_one.collegepartner.repository.*;
import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.studyabroad.repository.InstitutionRepository;
import com.ALL_in_one.repository.UserRepository;
import com.ALL_in_one.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class CollegePartnerService {
    private final CollegePartnerAccountRepository accounts;
    private final CollegeSubscriptionRepository subscriptions;
    private final CollegeAnalyticsEventRepository events;
    private final CollegeStudentEnquiryRepository enquiries;
    private final StudentDataAccessLogRepository accessLogs;
    private final InstitutionRepository institutions;
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final SecureRandom random = new SecureRandom();
    private static final String PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    private static final Set<String> STATUSES = Set.of("NEW", "CONTACTED", "FOLLOW_UP", "INTERESTED", "CONVERTED", "CLOSED");

    @Transactional
    public Map<String,Object> create(CollegePartnerCreateRequest request) {
        Institution institution = institutions.findById(request.institutionId()).orElseThrow(() -> new IllegalArgumentException("College record not found."));
        if (accounts.existsByInstitution_Id(institution.getId())) throw new IllegalArgumentException("This college already has a partner account.");
        String username = request.username() == null || request.username().isBlank() ? generatedUsername(institution.getName()) : request.username().trim().toLowerCase(Locale.ROOT);
        if (!username.matches("[a-z0-9._-]{4,40}")) throw new IllegalArgumentException("Username must be 4–40 letters, numbers, dots, dashes or underscores.");
        if (accounts.existsByUsernameIgnoreCase(username)) throw new IllegalArgumentException("That username is already in use.");
        String temporaryPassword = newPassword();
        CollegePartnerAccount account = new CollegePartnerAccount();
        account.setInstitution(institution); account.setUsername(username); account.setPasswordHash(encoder.encode(temporaryPassword));
        account.setOfficialEmail(request.officialEmail().trim().toLowerCase(Locale.ROOT)); account.setContactPerson(clean(request.contactPerson()));
        account.setContactEmail(clean(request.contactEmail())); account.setContactNumber(clean(request.contactNumber())); account.setActive(true); account.setMustChangePassword(true);
        account = accounts.save(account);
        return Map.of("id", account.getId(), "institutionId", institution.getId(), "collegeName", institution.getName(), "username", username, "temporaryPassword", temporaryPassword, "active", true, "mustChangePassword", true);
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminList() {
        return accounts.findAll().stream().map(a -> {
            Map<String,Object> row = new LinkedHashMap<>(); row.put("id", a.getId()); row.put("institutionId", a.getInstitution().getId()); row.put("collegeName", a.getInstitution().getName());
            row.put("username", a.getUsername()); row.put("officialEmail", a.getOfficialEmail()); row.put("contactPerson", a.getContactPerson()); row.put("contactEmail", a.getContactEmail()); row.put("contactNumber", a.getContactNumber()); row.put("active", a.isActive());
            row.put("subscriptionActive", activeSubscription(a.getId()).isPresent()); row.put("subscriptionExpiresAt", activeSubscription(a.getId()).map(CollegeSubscription::getExpiresAt).orElse(null)); return row;
        }).toList();
    }

    @Transactional
    public void setActive(Long id, boolean active) { CollegePartnerAccount a = account(id); a.setActive(active); accounts.save(a); }

    @Transactional
    public void update(Long id, CollegePartnerCreateRequest request) {
        CollegePartnerAccount a = account(id);
        if (request.institutionId() != null && !Objects.equals(a.getInstitution().getId(), request.institutionId())) throw new IllegalArgumentException("A partner account cannot be reassigned to a different college record.");
        String username = request.username() == null || request.username().isBlank() ? a.getUsername() : request.username().trim().toLowerCase(Locale.ROOT);
        if (!username.matches("[a-z0-9._-]{4,40}")) throw new IllegalArgumentException("Username must be 4–40 letters, numbers, dots, dashes or underscores.");
        if (!username.equalsIgnoreCase(a.getUsername()) && accounts.existsByUsernameIgnoreCaseAndIdNot(username, id)) throw new IllegalArgumentException("That username is already in use.");
        a.setUsername(username); a.setOfficialEmail(request.officialEmail().trim().toLowerCase(Locale.ROOT)); a.setContactPerson(clean(request.contactPerson())); a.setContactEmail(clean(request.contactEmail())); a.setContactNumber(clean(request.contactNumber())); accounts.save(a);
    }

    @Transactional
    public Map<String,Object> resetPassword(Long id) {
        CollegePartnerAccount a = account(id); String password = newPassword(); a.setPasswordHash(encoder.encode(password)); a.setMustChangePassword(true); accounts.save(a);
        return Map.of("username", a.getUsername(), "temporaryPassword", password, "mustChangePassword", true);
    }

    @Transactional(readOnly = true)
    public Map<String,Object> login(CollegeLoginRequest request) {
        CollegePartnerAccount account = accounts.findByUsernameIgnoreCase(request.username().trim()).orElseThrow(() -> new BadCredentialsException("Invalid username or password."));
        if (!account.isActive() || !encoder.matches(request.password(), account.getPasswordHash())) throw new BadCredentialsException("Invalid username or password.");
        return Map.of("token", jwtService.generateToken(account.getUsername()), "userId", account.getId(), "username", account.getUsername(), "fullName", account.getInstitution().getName(), "role", "COLLEGE", "mustChangePassword", account.isMustChangePassword());
    }

    @Transactional
    public void changePassword(String username, CollegePasswordChangeRequest request) {
        CollegePartnerAccount account = accountByUsername(username);
        if (!encoder.matches(request.currentPassword(), account.getPasswordHash())) throw new IllegalArgumentException("Current password is incorrect.");
        if (request.newPassword().equals(request.currentPassword())) throw new IllegalArgumentException("Choose a password different from the current password.");
        account.setPasswordHash(encoder.encode(request.newPassword())); account.setMustChangePassword(false); accounts.save(account);
    }

    @Transactional(readOnly = true)
    public Map<String,Object> dashboard(String username) {
        CollegePartnerAccount a = accountByUsername(username); Long iid = a.getInstitution().getId(); LocalDateTime since = LocalDateTime.now().minusDays(30);
        long pageViews = events.countByInstitution_IdAndEventTypeAndCreatedAtAfter(iid, "PAGE_VIEW", since);
        Map<String,Object> result = new LinkedHashMap<>(); result.put("collegeName", a.getInstitution().getName()); result.put("institutionId", iid);
        result.put("pageVisits30d", pageViews); result.put("uniqueVisitors30d", events.countUniqueVisitors(iid, since)); result.put("authenticatedStudents30d", events.countAuthenticatedStudents(iid, since));
        result.put("profileViews30d", events.countByInstitution_IdAndEventTypeAndCreatedAtAfter(iid, "PROFILE_VIEW", since)); result.put("enquiryClicks30d", events.countByInstitution_IdAndEventTypeAndCreatedAtAfter(iid, "ENQUIRY_CLICK", since));
        result.put("enquiries30d", enquiries.findByInstitution_IdOrderByCreatedAtDesc(iid).stream().filter(e -> e.getCreatedAt().isAfter(since)).count());
        result.put("interestedStudents", enquiries.countByInstitution_Id(iid)); result.put("subscriptionActive", activeSubscription(a.getId()).isPresent());
        result.put("subscriptionExpiresAt", activeSubscription(a.getId()).map(CollegeSubscription::getExpiresAt).orElse(null)); return result;
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> leads(String username) {
        CollegePartnerAccount a = accountByUsername(username); boolean paid = activeSubscription(a.getId()).isPresent();
        return enquiries.findByInstitution_IdOrderByCreatedAtDesc(a.getInstitution().getId()).stream().map(e -> {
            Map<String,Object> row = new LinkedHashMap<>(); row.put("id", e.getId()); row.put("student", maskName(e.getStudentName())); row.put("contact", maskPhone(e.getStudentPhone())); row.put("email", maskEmail(e.getStudentEmail()));
            row.put("course", e.getCourse()); row.put("status", e.getStatus()); row.put("consentGiven", e.isConsentGiven()); row.put("date", e.getCreatedAt()); row.put("eligibleForDetails", paid && e.isConsentGiven() && e.getConsentAt() != null); return row;
        }).toList();
    }

    @Transactional
    public Map<String,Object> leadDetails(String username, Long enquiryId) {
        CollegePartnerAccount a = accountByUsername(username); CollegeStudentEnquiry e = enquiries.findById(enquiryId).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        if (!Objects.equals(e.getInstitution().getId(), a.getInstitution().getId())) throw new IllegalArgumentException("Enquiry not found.");
        if (!e.isConsentGiven() || e.getConsentAt() == null || activeSubscription(a.getId()).isEmpty()) return Map.of("id",e.getId(),"student",maskName(e.getStudentName()),"contact",maskPhone(e.getStudentPhone()),"email",maskEmail(e.getStudentEmail()),"course",Objects.toString(e.getCourse(),""),"date",e.getCreatedAt(),"status",e.getStatus(),"consentGiven",e.isConsentGiven(),"locked",true);
        accessLogs.save(new StudentDataAccessLog(a, e));
        Map<String,Object> details = new LinkedHashMap<>(); details.put("id",e.getId()); details.put("student",e.getStudentName()); details.put("contact",e.getStudentPhone()); details.put("email",e.getStudentEmail()); details.put("course",e.getCourse()); details.put("message",e.getMessage()); details.put("date",e.getCreatedAt()); details.put("status",e.getStatus()); details.put("consentGiven",true); details.put("locked",false); return details;
    }

    @Transactional
    public void updateLeadStatus(String username, Long enquiryId, String status) {
        String normalized = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);
        if (!STATUSES.contains(normalized)) throw new IllegalArgumentException("Invalid enquiry status.");
        CollegePartnerAccount a = accountByUsername(username); CollegeStudentEnquiry e = enquiries.findById(enquiryId).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        if (!Objects.equals(e.getInstitution().getId(), a.getInstitution().getId())) throw new IllegalArgumentException("Enquiry not found.");
        e.setStatus(normalized); enquiries.save(e);
    }

    @Transactional
    public CollegeStudentEnquiry submitEnquiry(CollegeEnquiryRequest request, String visitorId, String authenticatedEmail) {
        Institution institution = institutions.findByIdAndActiveTrueAndStudyAbroadEnabledTrue(request.institutionId()).orElseThrow(() -> new IllegalArgumentException("College record not found."));
        CollegeStudentEnquiry e = new CollegeStudentEnquiry(); e.setInstitution(institution); e.setStudentName(request.name().trim()); e.setStudentEmail(request.email().trim().toLowerCase(Locale.ROOT)); e.setStudentPhone(clean(request.phone())); e.setCourse(clean(request.course())); e.setMessage(clean(request.message())); e.setConsentGiven(true); e.setConsentAt(LocalDateTime.now());
        users.findByEmail(authenticatedEmail == null ? "" : authenticatedEmail).filter(user -> "STUDENT".equals(user.getRole())).ifPresent(e::setStudent);
        CollegeStudentEnquiry saved = enquiries.save(e); recordEvent(institution.getId(), visitorId, "ENQUIRY_SUBMITTED", request.course(), e.getStudent() == null ? null : e.getStudent().getId()); return saved;
    }

    @Transactional
    public void recordEvent(Long institutionId, String visitorId, String eventType, String course, Long studentId) {
        Institution institution = institutions.findByIdAndActiveTrueAndStudyAbroadEnabledTrue(institutionId).orElseThrow(() -> new IllegalArgumentException("College record not found."));
        Set<String> allowed = Set.of("PAGE_VIEW", "PROFILE_VIEW", "ENQUIRY_CLICK", "ENQUIRY_SUBMITTED"); if (!allowed.contains(eventType)) throw new IllegalArgumentException("Invalid analytics event.");
        CollegeAnalyticsEvent event = new CollegeAnalyticsEvent(); event.setInstitution(institution); event.setEventType(eventType); event.setVisitorId(normalizeVisitor(visitorId)); event.setCourse(clean(course)); if (studentId != null) users.findById(studentId).filter(user -> "STUDENT".equals(user.getRole())).ifPresent(event::setStudent); events.save(event);
    }

    @Transactional(readOnly = true)
    public Map<String,Object> adminSummary() {
        List<CollegePartnerAccount> all = accounts.findAll(); LocalDateTime now = LocalDateTime.now();
        long activeSubs = all.stream().filter(a -> activeSubscription(a.getId()).isPresent()).count();
        return Map.of("totalPartners", all.size(), "activeAccounts", all.stream().filter(CollegePartnerAccount::isActive).count(), "inactiveAccounts", all.stream().filter(a -> !a.isActive()).count(), "activeSubscriptions", activeSubs, "expiredOrInactiveSubscriptions", Math.max(0, all.size()-activeSubs), "monthlyRevenuePaise", 0L, "pageVisits", events.countByEventType("PAGE_VIEW"), "enquiries", enquiries.count());
    }

    private Optional<CollegeSubscription> activeSubscription(Long accountId) { return subscriptions.findFirstByAccount_IdAndStatusAndExpiresAtAfterOrderByExpiresAtDesc(accountId, "ACTIVE", LocalDateTime.now()); }
    private CollegePartnerAccount account(Long id) { return accounts.findById(id).orElseThrow(() -> new IllegalArgumentException("College partner not found.")); }
    private CollegePartnerAccount accountByUsername(String username) { return accounts.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("College partner not found.")); }
    private String generatedUsername(String name) { String slug = name.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "").substring(0, Math.min(18, name.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "").length())); if (slug.length()<4) slug="college"; String value; do { value=slug+String.format("%04d", random.nextInt(10000)); } while(accounts.existsByUsernameIgnoreCase(value)); return value; }
    private String newPassword() {
        String upper="ABCDEFGHJKLMNPQRSTUVWXYZ", lower="abcdefghijkmnopqrstuvwxyz", digits="23456789", symbols="!@#$%";
        List<Character> chars = new ArrayList<>();
        for (String group : List.of(upper, lower, digits, symbols)) chars.add(group.charAt(random.nextInt(group.length())));
        for (int i=4;i<20;i++) chars.add(PASSWORD_CHARS.charAt(random.nextInt(PASSWORD_CHARS.length())));
        Collections.shuffle(chars, random); StringBuilder value = new StringBuilder(); chars.forEach(value::append); return value.toString();
    }
    private String clean(String s) { return s == null || s.isBlank() ? null : s.trim(); }
    private String normalizeVisitor(String visitorId) { if (visitorId == null || !visitorId.matches("[A-Za-z0-9_-]{16,64}")) return null; return visitorId; }
    private String maskName(String value) { if(value==null||value.isBlank())return "—"; String prefix=value.replaceAll("[^\\p{L}]",""); return (prefix.length()>3?prefix.substring(0,3):prefix)+"****"; }
    private String maskPhone(String value) { if(value==null||value.isBlank())return "—"; String digits=value.replaceAll("\\D",""); return "******"+(digits.length()>=4?digits.substring(digits.length()-4):digits); }
    private String maskEmail(String value) { if(value==null||!value.contains("@"))return "—"; String[] p=value.split("@",2); return p[0].substring(0,Math.min(3,p[0].length()))+"****@"+p[1]; }
}

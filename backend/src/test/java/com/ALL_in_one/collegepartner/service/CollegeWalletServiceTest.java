package com.ALL_in_one.collegepartner.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.ALL_in_one.collegepartner.dto.WalletDecisionRequest;
import com.ALL_in_one.collegepartner.dto.WalletDepositRequest;
import com.ALL_in_one.collegepartner.dto.WalletUnlockRequest;
import com.ALL_in_one.collegepartner.entity.*;
import com.ALL_in_one.collegepartner.repository.*;
import com.ALL_in_one.studyabroad.entity.Institution;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

class CollegeWalletServiceTest {
  private CollegePartnerAccountRepository accounts;
  private CollegePartnerWalletRepository wallets;
  private CollegeWalletTransactionRepository transactions;
  private CollegeWalletSettingsRepository settings;
  private CollegeStudentEnquiryRepository enquiries;
  private StudentDataAccessLogRepository accessLogs;
  private CollegeWalletService service;
  private CollegePartnerAccount account;
  private CollegePartnerWallet wallet;
  private CollegeStudentEnquiry enquiry;
  private CollegeWalletSettings walletSettings;
  private CollegeWalletTransaction deposit;

  @BeforeEach
  void setUp() {
    accounts = mock(CollegePartnerAccountRepository.class);
    wallets = mock(CollegePartnerWalletRepository.class);
    transactions = mock(CollegeWalletTransactionRepository.class);
    settings = mock(CollegeWalletSettingsRepository.class);
    enquiries = mock(CollegeStudentEnquiryRepository.class);
    accessLogs = mock(StudentDataAccessLogRepository.class);
    service =
        new CollegeWalletService(accounts, wallets, transactions, settings, enquiries, accessLogs);

    Institution institution = new Institution();
    institution.setId(8L);
    institution.setName("Example Institution");
    account = new CollegePartnerAccount();
    account.setId(3L);
    account.setUsername("partner1");
    account.setInstitution(institution);
    account.setActive(true);
    wallet = new CollegePartnerWallet();
    wallet.setId(4L);
    wallet.setAccount(account);
    wallet.setBalance(new BigDecimal("100.00"));
    wallet.setTotalAdded(new BigDecimal("100.00"));
    wallet.setTotalSpent(BigDecimal.ZERO);
    enquiry = new CollegeStudentEnquiry();
    enquiry.setId(5L);
    enquiry.setInstitution(institution);
    enquiry.setStudentName("Test Student");
    enquiry.setStudentEmail("student@example.test");
    enquiry.setStudentPhone("9876543210");
    enquiry.setCourse("Architecture");
    enquiry.setConsentGiven(true);
    enquiry.setConsentAt(LocalDateTime.now());
    enquiry.setConsentScope("INSTITUTION_CONTACT");
    walletSettings = new CollegeWalletSettings();
    walletSettings.setId(1L);
    walletSettings.setPricePerEnquiry(new BigDecimal("25.50"));
    walletSettings.setExclusiveLeadPrice(new BigDecimal("25.50"));

    when(accounts.findByUsernameForUpdate("partner1")).thenReturn(Optional.of(account));
    when(accounts.findByUsername("partner1")).thenReturn(Optional.of(account));
    when(wallets.findByAccountIdForUpdate(3L)).thenReturn(Optional.of(wallet));
    when(settings.findById(1L)).thenReturn(Optional.of(walletSettings));
    when(enquiries.findById(5L)).thenReturn(Optional.of(enquiry));
    when(transactions.existsByPaymentReferenceIgnoreCase(any())).thenReturn(false);
    when(transactions.save(any())).thenAnswer(invocation -> invocation.getArgument(0));
  }

  @Test
  void unlockChargesOnceAndPreviouslyUnlockedEnquiryIsFree() {
    AtomicBoolean recorded = new AtomicBoolean(false);
    CollegeWalletTransaction existingUnlock = new CollegeWalletTransaction();
    existingUnlock.setStatus("COMPLETED");
    when(transactions.findByAccount_IdAndEnquiry_IdAndTransactionTypeAndStatus(
            3L, 5L, "LEAD_UNLOCK", "COMPLETED"))
        .thenAnswer(invocation -> recorded.get() ? Optional.of(existingUnlock) : Optional.empty());
    when(transactions.save(any()))
        .thenAnswer(invocation -> {
          CollegeWalletTransaction row = invocation.getArgument(0);
          if ("LEAD_UNLOCK".equals(row.getTransactionType())) recorded.set(true);
          return row;
        });

    var first = service.unlock("partner1", new WalletUnlockRequest(List.of(5L)));
    var second = service.unlock("partner1", new WalletUnlockRequest(List.of(5L)));

    assertEquals(new BigDecimal("25.50"), first.get("charged"));
    assertEquals(1, first.get("newlyUnlocked"));
    assertEquals(BigDecimal.ZERO.setScale(2), second.get("charged"));
    assertEquals(1, second.get("alreadyUnlocked"));
    assertEquals(new BigDecimal("74.50"), wallet.getBalance());
    assertEquals(new BigDecimal("25.50"), wallet.getTotalSpent());
    verify(accessLogs, times(1)).save(any(StudentDataAccessLog.class));
  }

  @Test
  void insufficientBalanceDoesNotCreateChargeOrExposeEnquiry() {
    wallet.setBalance(new BigDecimal("10.00"));
    when(transactions.findByAccount_IdAndEnquiry_IdAndTransactionTypeAndStatus(
            3L, 5L, "LEAD_UNLOCK", "COMPLETED"))
        .thenReturn(Optional.empty());

    IllegalArgumentException error =
        assertThrows(
            IllegalArgumentException.class,
            () -> service.unlock("partner1", new WalletUnlockRequest(List.of(5L))));

    assertTrue(error.getMessage().contains("Insufficient wallet balance"));
    assertEquals(new BigDecimal("10.00"), wallet.getBalance());
    verify(transactions, never()).save(any());
  }

  @Test
  void unlockUsesTheLeadPriceSnapshotAndStoresTierAndUnitPriceInLedger() {
    enquiry.setLeadProductType("HOT_LEAD");
    enquiry.setLeadUnitPrice(new BigDecimal("150.00"));
    wallet.setBalance(new BigDecimal("200.00"));
    when(transactions.findByAccount_IdAndEnquiry_IdAndTransactionTypeAndStatus(
            3L, 5L, "LEAD_UNLOCK", "COMPLETED"))
        .thenReturn(Optional.empty());

    var result = service.unlock("partner1", new WalletUnlockRequest(List.of(5L)));

    assertEquals(new BigDecimal("150.00"), result.get("charged"));
    assertEquals(new BigDecimal("50.00"), wallet.getBalance());
    ArgumentCaptor<CollegeWalletTransaction> charge =
        ArgumentCaptor.forClass(CollegeWalletTransaction.class);
    verify(transactions).save(charge.capture());
    assertEquals("HOT_LEAD", charge.getValue().getLeadProductType());
    assertEquals(new BigDecimal("150.00"), charge.getValue().getUnitPrice());
    assertEquals(1, charge.getValue().getQuantity());
    assertEquals(new BigDecimal("-150.00"), charge.getValue().getAmount());
  }

  @Test
  void depositRequestDoesNotCreditUntilAdminApprovesAndCannotBeApprovedTwice() {
    deposit = new CollegeWalletTransaction();
    deposit.setAccount(account);
    deposit.setTransactionType("DEPOSIT_REQUEST");
    deposit.setAmount(new BigDecimal("500.00"));
    deposit.setStatus("PENDING");
    deposit.setPaymentReference("UPI-REF-12345");
    when(accounts.findByIdForUpdate(3L)).thenReturn(Optional.of(account));
    when(transactions.findByIdForUpdate(71L))
        .thenAnswer(invocation -> Optional.ofNullable(deposit));
    when(transactions.findByAccount_IdOrderByCreatedAtDesc(3L))
        .thenAnswer(invocation -> List.of(deposit));
    when(transactions.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

    var pending =
        service.requestDeposit(
            "partner1",
            new WalletDepositRequest(new BigDecimal("500.00"), "upi-ref-12345", "Payment sent"));
    assertEquals("PENDING", pending.get("status"));
    assertEquals(new BigDecimal("100.00"), wallet.getBalance());

    service.reviewDeposit(
        71L, new WalletDecisionRequest("APPROVE", "Verified against bank statement"), "admin");
    assertEquals("APPROVED", deposit.getStatus());
    assertEquals(new BigDecimal("600.00"), wallet.getBalance());
    assertEquals(new BigDecimal("600.00"), wallet.getTotalAdded());
    assertThrows(
        IllegalArgumentException.class,
        () -> service.reviewDeposit(71L, new WalletDecisionRequest("APPROVE", "Repeat"), "admin"));
  }
}

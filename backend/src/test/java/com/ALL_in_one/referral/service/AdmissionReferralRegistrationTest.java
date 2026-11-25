package com.ALL_in_one.referral.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.ALL_in_one.referral.dto.PartnerInterestRequest;
import com.ALL_in_one.referral.entity.AdmissionPartner;
import com.ALL_in_one.referral.repository.AdmissionPartnerRepository;
import com.ALL_in_one.referral.repository.ReferralAuditLogRepository;
import com.ALL_in_one.referral.repository.ReferralCommissionRepository;
import com.ALL_in_one.referral.repository.ReferralLeadRepository;
import com.ALL_in_one.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

class AdmissionReferralRegistrationTest {
  private final AdmissionPartnerRepository partners = mock(AdmissionPartnerRepository.class);
  private final ReferralLeadRepository leads = mock(ReferralLeadRepository.class);
  private final ReferralCommissionRepository commissions = mock(ReferralCommissionRepository.class);
  private final ReferralAuditLogRepository auditLogs = mock(ReferralAuditLogRepository.class);
  private final UserRepository users = mock(UserRepository.class);
  private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
  private final AdmissionReferralService service =
      new AdmissionReferralService(partners, leads, commissions, auditLogs, users, passwordEncoder);

  @Test
  void registersPendingSubpartnerUnderEligibleSuperpartner() {
    AdmissionPartner superPartner = new AdmissionPartner();
    superPartner.setId(12L);
    superPartner.setCollegeName("North College");
    superPartner.setSubpartnersAllowed(true);
    when(partners.existsByEmailIgnoreCase("sub@example.com")).thenReturn(false);
    when(partners.findByReferralCodeAndStatus("EC1234567890", "APPROVED"))
        .thenReturn(Optional.of(superPartner));
    when(partners.save(any(AdmissionPartner.class)))
        .thenAnswer(invocation -> {
          AdmissionPartner partner = invocation.getArgument(0);
          partner.setId(34L);
          return partner;
        });

    var result = service.register(request("ec1234567890"));

    verify(partners)
        .save(
            org.mockito.ArgumentMatchers.argThat(partner ->
                partner.getParent() == superPartner
                    && "North College".equals(partner.getCollegeName())
                    && "Subpartner".equals(partner.getExperience())
                    && "PENDING".equals(partner.getStatus())));
    assertEquals("PENDING", result.get("status"));
    assertTrue(((String) result.get("message")).contains("24 to 48 hours"));
  }

  @Test
  void requiresSuperPartnerReferralCode() {
    when(partners.existsByEmailIgnoreCase("sub@example.com")).thenReturn(false);

    ResponseStatusException error =
        assertThrows(ResponseStatusException.class, () -> service.register(request(null)));

    assertEquals(400, error.getStatusCode().value());
    verify(partners, never()).save(any(AdmissionPartner.class));
  }

  @Test
  void rejectsSuperPartnerWhoCannotAcceptSubpartners() {
    AdmissionPartner superPartner = new AdmissionPartner();
    superPartner.setSubpartnersAllowed(false);
    when(partners.existsByEmailIgnoreCase("sub@example.com")).thenReturn(false);
    when(partners.findByReferralCodeAndStatus("EC1234567890", "APPROVED"))
        .thenReturn(Optional.of(superPartner));

    ResponseStatusException error =
        assertThrows(
            ResponseStatusException.class, () -> service.register(request("EC1234567890")));

    assertEquals(409, error.getStatusCode().value());
    verify(partners, never()).save(any(AdmissionPartner.class));
  }

  private PartnerInterestRequest request(String parentReferralCode) {
    return new PartnerInterestRequest(
        "Subpartner Applicant",
        "sub@example.com",
        "9876543210",
        "Subpartner",
        null,
        parentReferralCode,
        true);
  }
}

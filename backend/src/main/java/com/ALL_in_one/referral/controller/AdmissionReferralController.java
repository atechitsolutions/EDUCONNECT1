package com.ALL_in_one.referral.controller;

import com.ALL_in_one.referral.dto.*;
import com.ALL_in_one.referral.service.AdmissionReferralService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AdmissionReferralController {
  private final AdmissionReferralService service;

  @PostMapping("/api/admission-partners/register")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> register(@Valid @RequestBody PartnerInterestRequest request) {
    return service.register(request);
  }

  @GetMapping("/api/admission-partners/referrals/validate")
  public Map<String, Object> validate(@RequestParam String code) {
    return service.validateCode(code);
  }

  @PostMapping("/api/admission-partners/referrals")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> referral(
      @RequestParam String code, @Valid @RequestBody ReferralLeadRequest request) {
    return service.submitLead(code, request);
  }

  @GetMapping("/api/admission-partners/me")
  @PreAuthorize("hasAnyRole('DIRECT_PARTNER','SUBPARTNER')")
  public Map<String, Object> dashboard(Authentication auth) {
    return service.dashboard(auth.getName());
  }

  @PostMapping("/api/admission-partners/me/subpartners")
  @PreAuthorize("hasRole('DIRECT_PARTNER')")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> invite(
      @RequestBody @Valid PartnerInterestRequest request, Authentication auth) {
    var dashboard = service.dashboard(auth.getName());
    return service.invite(((Number) dashboard.get("id")).longValue(), auth.getName(), request);
  }

  @PutMapping("/api/admission-partners/me/college-terms")
  @PreAuthorize("hasRole('DIRECT_PARTNER')")
  public Map<String, Object> collegeTerms(
      @RequestBody @Valid PartnerTermsRequest request, Authentication auth) {
    return service.setCollegeTerms(auth.getName(), request);
  }

  @GetMapping("/api/admin/admission-partners")
  @PreAuthorize("hasRole('ADMIN')")
  public List<Map<String, Object>> partners() {
    return service.adminList();
  }

  @GetMapping("/api/admin/admission-partners/leads")
  @PreAuthorize("hasRole('ADMIN')")
  public List<Map<String, Object>> leads() {
    return service.adminLeads();
  }

  @GetMapping("/api/admin/admission-partners/audit")
  @PreAuthorize("hasRole('ADMIN')")
  public List<Map<String, Object>> audit() {
    return service.adminAudit();
  }

  @PatchMapping("/api/admin/admission-partners/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public Map<String, Object> decide(
      @PathVariable Long id,
      @Valid @RequestBody PartnerDecisionRequest request,
      Authentication auth) {
    return service.decide(id, request, auth.getName());
  }

  @PatchMapping("/api/admin/admission-partners/leads/{id}/admission")
  @PreAuthorize("hasRole('ADMIN')")
  public Map<String, Object> admission(
      @PathVariable Long id,
      @Valid @RequestBody AdmissionStatusRequest request,
      Authentication auth) {
    return service.admission(id, request, auth.getName());
  }

  @PostMapping("/api/admin/admission-partners/commissions")
  @PreAuthorize("hasRole('ADMIN')")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> commission(
      @Valid @RequestBody CommissionRequest request, Authentication auth) {
    return service.postCommission(request, auth.getName());
  }

  @GetMapping("/api/admin/admission-partners/commissions")
  @PreAuthorize("hasRole('ADMIN')")
  public List<Map<String, Object>> ledger() {
    return service.adminLedger();
  }

  @PatchMapping("/api/admin/admission-partners/commissions/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public Map<String, Object> reconcile(
      @PathVariable Long id, @RequestBody Map<String, String> body, Authentication auth) {
    return service.reconcile(
        id, body.getOrDefault("status", ""), body.get("remittanceReference"), auth.getName());
  }
}

package com.ALL_in_one.collegepartner.controller;

import com.ALL_in_one.collegepartner.dto.*;
import com.ALL_in_one.collegepartner.service.CollegePartnerService;
import com.ALL_in_one.collegepartner.service.CollegeWalletService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/college-partners")
@PreAuthorize("hasRole('ADMIN')")
public class CollegePartnerAdminController {
  private final CollegePartnerService service;
  private final CollegeWalletService walletService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> create(@Valid @RequestBody CollegePartnerCreateRequest request) {
    return service.create(request);
  }

  @GetMapping
  public List<Map<String, Object>> list() {
    return service.adminList();
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void update(
      @PathVariable Long id, @Valid @RequestBody CollegePartnerCreateRequest request) {
    service.update(id, request);
  }

  @GetMapping("/summary")
  public Map<String, Object> summary() {
    return service.adminSummary();
  }

  @PatchMapping("/{id}/status")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void status(@PathVariable Long id, @RequestBody CollegeStatusRequest request) {
    service.setActive(id, request.active());
  }

  @PostMapping("/{id}/reset-password")
  public Map<String, Object> reset(@PathVariable Long id) {
    return service.resetPassword(id);
  }

  @GetMapping("/interest")
  public Map<String, Object> interest() {
    return service.adminInterest();
  }

  @GetMapping("/interest/students/{studentId}")
  public Map<String, Object> studentInterest(@PathVariable Long studentId) {
    return service.adminStudentInterest(studentId);
  }

  @PostMapping("/interest/notifications")
  public Map<String, Object> sendInterestNotification(
      @RequestBody Map<String, Long> request,
      org.springframework.security.core.Authentication authentication) {
    return service.sendInterestNotification(
        request.get("studentId"), request.get("institutionId"), authentication.getName());
  }

  @PatchMapping("/interest/notifications/{id}/reviewed")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void reviewed(@PathVariable Long id) {
    service.markNotificationReviewed(id);
  }

  @GetMapping("/interest/history")
  public List<Map<String, Object>> interestHistory() {
    return service.adminNotificationHistory();
  }

  @GetMapping("/leads/partners")
  public List<Map<String, Object>> leadPartners() {
    return service.adminLeadPartners();
  }

  @GetMapping("/leads/summary")
  public Map<String, Object> leadSummary() {
    return service.adminLeadSummary();
  }

  @GetMapping("/leads")
  public List<Map<String, Object>> leads() {
    return service.adminLeadList();
  }

  @GetMapping("/leads/audit")
  public List<Map<String, Object>> leadAudit() {
    return service.adminLeadAudit();
  }

  @GetMapping("/wallet/settings")
  public Map<String, Object> walletSettings() {
    return walletService.adminSettings();
  }

  @PutMapping("/wallet/settings")
  public Map<String, Object> updateWalletSettings(
      @Valid @RequestBody WalletSettingsRequest request,
      org.springframework.security.core.Authentication authentication) {
    return walletService.updateSettings(request, authentication.getName());
  }

  @GetMapping("/wallet/balances")
  public List<Map<String, Object>> walletBalances() {
    return walletService.adminBalances();
  }

  @GetMapping("/wallet/deposits")
  public List<Map<String, Object>> walletDeposits(@RequestParam(required = false) String status) {
    return walletService.adminDeposits(status);
  }

  @PatchMapping("/wallet/deposits/{id}")
  public Map<String, Object> reviewWalletDeposit(
      @PathVariable Long id,
      @Valid @RequestBody WalletDecisionRequest request,
      org.springframework.security.core.Authentication authentication) {
    return walletService.reviewDeposit(id, request, authentication.getName());
  }

  @GetMapping("/wallet/transactions")
  public List<Map<String, Object>> walletTransactions() {
    return walletService.adminTransactions();
  }

  @GetMapping("/wallet/unlocked-leads")
  public List<Map<String, Object>> unlockedLeads() {
    return walletService.adminUnlockedLeads();
  }

  @PostMapping("/wallet/{accountId}/adjustments")
  public Map<String, Object> adjustWallet(
      @PathVariable Long accountId,
      @Valid @RequestBody WalletAdjustmentRequest request,
      org.springframework.security.core.Authentication authentication) {
    return walletService.adminAdjust(accountId, request, authentication.getName());
  }

  @PostMapping("/leads")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> createLead(
      @Valid @RequestBody AdminLeadRequest request,
      org.springframework.security.core.Authentication authentication) {
    return service.createAdminLead(request, authentication.getName());
  }

  @PostMapping("/leads/import/preview")
  public Map<String, Object> previewLeadImport(
      @RequestParam("file") MultipartFile file, @RequestParam("institutionId") Long institutionId) {
    return service.previewLeadImport(file, institutionId);
  }

  @PostMapping("/leads/import/assign")
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> assignImportedLeads(
      @Valid @RequestBody LeadImportAssignRequest request,
      org.springframework.security.core.Authentication authentication) {
    return service.assignImportedLeads(request, authentication.getName());
  }

  @GetMapping(value = "/leads/import/template", produces = "text/csv")
  public org.springframework.http.ResponseEntity<String> leadImportTemplate() {
    return org.springframework.http.ResponseEntity.ok()
        .header(
            org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=stepinstudents-lead-template.csv")
        .body(
            "studentName,studentEmail,studentPhone,alternativePhone,course,preferredDegree,"
                + "studyMode,preferredCountry,currentQualification,passingYear,preferredCollege,"
                + "city,state,message,consentGiven,consentReference,priority,status,adminNotes\n");
  }
}

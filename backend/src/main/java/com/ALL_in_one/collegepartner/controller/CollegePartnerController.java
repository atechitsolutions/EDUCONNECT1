package com.ALL_in_one.collegepartner.controller;
import com.ALL_in_one.collegepartner.dto.*;
import com.ALL_in_one.collegepartner.service.CollegePartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController @RequiredArgsConstructor @RequestMapping("/api/college")
public class CollegePartnerController {
    private final CollegePartnerService service;
    @PostMapping("/auth/login") public Map<String,Object> login(@Valid @RequestBody CollegeLoginRequest request) { return service.login(request); }
    @PostMapping("/enquiries") @ResponseStatus(HttpStatus.CREATED) public Map<String,Object> enquiry(@Valid @RequestBody CollegeEnquiryRequest request, @RequestHeader(value="X-Visitor-Id",required=false) String visitorId, Authentication authentication) { var saved=service.submitEnquiry(request, visitorId, authentication == null ? null : authentication.getName()); return Map.of("id",saved.getId(),"message","Your enquiry has been submitted."); }
    @PostMapping("/auth/change-password") @PreAuthorize("hasRole('COLLEGE')") @ResponseStatus(HttpStatus.NO_CONTENT) public void changePassword(@Valid @RequestBody CollegePasswordChangeRequest request, Authentication authentication) { service.changePassword(authentication.getName(), request); }
    @GetMapping("/dashboard") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") public Map<String,Object> dashboard(Authentication authentication) { return service.dashboard(authentication.getName()); }
    @GetMapping("/enquiries") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") public List<Map<String,Object>> enquiries(Authentication authentication) { return service.leads(authentication.getName()); }
    @GetMapping("/enquiries/{id}") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") public Map<String,Object> enquiryDetails(@PathVariable Long id, Authentication authentication) { return service.leadDetails(authentication.getName(), id); }
    @PatchMapping("/enquiries/{id}/status") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") @ResponseStatus(HttpStatus.NO_CONTENT) public void updateStatus(@PathVariable Long id, @RequestBody Map<String,String> payload, Authentication authentication) { service.updateLeadStatus(authentication.getName(), id, payload.get("status")); }
    @GetMapping("/opportunity-alerts") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") public List<Map<String,Object>> alerts(Authentication authentication) { return service.partnerAlerts(authentication.getName()); }
    @PatchMapping("/opportunity-alerts/{id}/read") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") @ResponseStatus(HttpStatus.NO_CONTENT) public void readAlert(@PathVariable Long id, Authentication authentication) { service.markAlertRead(authentication.getName(), id, false); }
    @PatchMapping("/opportunity-alerts/{id}/archive") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") @ResponseStatus(HttpStatus.NO_CONTENT) public void archiveAlert(@PathVariable Long id, Authentication authentication) { service.markAlertRead(authentication.getName(), id, true); }
    @PostMapping("/enquiries/{id}/revoke-contact-consent") @PreAuthorize("hasRole('STUDENT')") @ResponseStatus(HttpStatus.NO_CONTENT) public void revokeContactConsent(@PathVariable Long id, Authentication authentication) { service.revokeContactConsent(id, authentication.getName()); }
    @GetMapping("/subscription/history") @PreAuthorize("hasRole('COLLEGE') and @collegePartnerAccess.passwordChanged(authentication.name)") public List<Map<String,Object>> subscriptionHistory(Authentication authentication) { return service.subscriptionHistory(authentication.getName()); }
}

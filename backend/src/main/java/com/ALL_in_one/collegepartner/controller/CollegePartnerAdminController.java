package com.ALL_in_one.collegepartner.controller;
import com.ALL_in_one.collegepartner.dto.*;
import com.ALL_in_one.collegepartner.service.CollegePartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController @RequiredArgsConstructor @RequestMapping("/api/admin/college-partners")
@PreAuthorize("hasRole('ADMIN')")
public class CollegePartnerAdminController {
    private final CollegePartnerService service;
    @PostMapping @ResponseStatus(HttpStatus.CREATED) public Map<String,Object> create(@Valid @RequestBody CollegePartnerCreateRequest request) { return service.create(request); }
    @GetMapping public List<Map<String,Object>> list() { return service.adminList(); }
    @PutMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void update(@PathVariable Long id, @Valid @RequestBody CollegePartnerCreateRequest request) { service.update(id, request); }
    @GetMapping("/summary") public Map<String,Object> summary() { return service.adminSummary(); }
    @PatchMapping("/{id}/status") @ResponseStatus(HttpStatus.NO_CONTENT) public void status(@PathVariable Long id, @RequestBody CollegeStatusRequest request) { service.setActive(id, request.active()); }
    @PostMapping("/{id}/reset-password") public Map<String,Object> reset(@PathVariable Long id) { return service.resetPassword(id); }
    @GetMapping("/interest") public Map<String,Object> interest() { return service.adminInterest(); }
    @GetMapping("/interest/students/{studentId}") public Map<String,Object> studentInterest(@PathVariable Long studentId) { return service.adminStudentInterest(studentId); }
    @PostMapping("/interest/notifications") public Map<String,Object> sendInterestNotification(@RequestBody Map<String,Long> request, org.springframework.security.core.Authentication authentication) { return service.sendInterestNotification(request.get("studentId"), request.get("institutionId"), authentication.getName()); }
    @PatchMapping("/interest/notifications/{id}/reviewed") @ResponseStatus(HttpStatus.NO_CONTENT) public void reviewed(@PathVariable Long id) { service.markNotificationReviewed(id); }
    @GetMapping("/interest/history") public List<Map<String,Object>> interestHistory() { return service.adminNotificationHistory(); }
    @GetMapping("/subscriptions") public List<Map<String,Object>> subscriptions() { return service.adminSubscriptions(); }
    @PostMapping("/{accountId}/subscription/activate") public Map<String,Object> activatePremium(@PathVariable Long accountId, @RequestBody Map<String,String> request, org.springframework.security.core.Authentication authentication) { return service.adminActivatePremium(accountId, request.get("paymentReference"), request.get("note"), authentication.getName()); }
    @PatchMapping("/{accountId}/subscription/status") @ResponseStatus(HttpStatus.NO_CONTENT) public void subscriptionStatus(@PathVariable Long accountId, @RequestBody Map<String,String> request, org.springframework.security.core.Authentication authentication) { service.adminSetSubscriptionStatus(accountId, request.get("status"), request.get("note"), authentication.getName()); }
    @GetMapping("/subscriptions/history") public List<Map<String,Object>> subscriptionHistory() { return service.adminSubscriptionHistory(); }
}

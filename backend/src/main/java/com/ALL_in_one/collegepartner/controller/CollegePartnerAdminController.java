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
}

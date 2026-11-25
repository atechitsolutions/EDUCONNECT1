package com.ALL_in_one.studyabroad.controller;

import com.ALL_in_one.collegepartner.service.CollegePartnerService;
import com.ALL_in_one.repository.UserRepository;
import com.ALL_in_one.studyabroad.dto.InstitutionRequest;
import com.ALL_in_one.studyabroad.dto.InstitutionResponse;
import com.ALL_in_one.studyabroad.service.InstitutionService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/institution")
public class InstitutionController {

  private final InstitutionService institutionService;
  private final CollegePartnerService collegePartnerService;
  private final UserRepository userRepository;

  @PostMapping
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<InstitutionResponse> createInstitution(
      @RequestBody InstitutionRequest institutionRequest) {

    InstitutionResponse response = institutionService.createInstitution(institutionRequest);

    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<InstitutionResponse>> getPublicInstitutions() {
    return ResponseEntity.ok(institutionService.getPublicInstitutions());
  }

  @GetMapping("/domestic")
  public ResponseEntity<List<InstitutionResponse>> getPublicDomesticInstitutions() {
    return ResponseEntity.ok(institutionService.getPublicDomesticInstitutions());
  }

  @GetMapping("/domestic/{id}")
  public ResponseEntity<InstitutionResponse> getPublicDomesticInstitutionById(
      @PathVariable Long id) {
    return ResponseEntity.ok(institutionService.getPublicDomesticInstitutionById(id));
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<InstitutionResponse>> getAllInstitutionsForAdmin() {
    return ResponseEntity.ok(institutionService.getAllInstitutions());
  }

  @GetMapping("/{id}")
  public ResponseEntity<InstitutionResponse> getInstitutionById(
      @PathVariable Long id, HttpServletRequest request, Authentication authentication) {

    Long studentId = null;
    if (authentication != null
        && authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .anyMatch("ROLE_STUDENT"::equals)) {
      studentId =
          userRepository
              .findByEmail(authentication.getName())
              .map(user -> user.getId())
              .orElse(null);
    }
    collegePartnerService.recordEvent(
        id,
        request.getHeader("X-Visitor-Id"),
        "PAGE_VIEW",
        null,
        studentId,
        request.getRequestURI(),
        null);

    return ResponseEntity.ok(institutionService.getPublicInstitutionById(id));
  }

  @PutMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<InstitutionResponse> updateInstitution(
      @PathVariable Long id, @RequestBody InstitutionRequest institutionRequest) {

    return ResponseEntity.ok(institutionService.updateInstitution(id, institutionRequest));
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
    institutionService.deleteInstitution(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}

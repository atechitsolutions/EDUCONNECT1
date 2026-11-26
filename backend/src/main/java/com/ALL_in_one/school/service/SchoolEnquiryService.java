package com.ALL_in_one.school.service;

import com.ALL_in_one.school.dto.SchoolEnquiryRequest;
import com.ALL_in_one.school.entity.SchoolEnquiry;
import com.ALL_in_one.school.repository.SchoolEnquiryRepository;
import com.ALL_in_one.notification.EmailNotificationService;
import java.util.Map;
import java.util.List;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SchoolEnquiryService {
  private final SchoolEnquiryRepository repository;
  private final EmailNotificationService emailNotifications;

  @Transactional
  public SchoolEnquiry submit(SchoolEnquiryRequest request) {
    SchoolEnquiry enquiry = new SchoolEnquiry();
    enquiry.setSchoolId(request.schoolId().trim());
    enquiry.setSchoolName(request.schoolName().trim());
    enquiry.setCity(request.city().trim());
    enquiry.setName(request.name().trim());
    enquiry.setEmail(request.email().trim().toLowerCase());
    enquiry.setPhone(request.phone().trim());
    enquiry.setGrade(request.grade().trim());
    enquiry.setMessage(request.message() == null ? null : request.message().trim());
    enquiry.setConsent(request.consent());
    SchoolEnquiry saved = repository.save(enquiry);
    emailNotifications.enqueue("School admission enquiry", "School discovery page", Map.of(
        "Name", saved.getName(), "Email", saved.getEmail(), "Phone", saved.getPhone(),
        "School", saved.getSchoolName(), "City", saved.getCity(), "Grade", saved.getGrade(),
        "Message", saved.getMessage() == null ? "" : saved.getMessage()));
    return saved;
  }

  @Transactional(readOnly = true)
  public List<SchoolEnquiry> list() {
    return repository.findAllByOrderByCreatedAtDesc();
  }

  @Transactional
  public SchoolEnquiry updateStatus(Long id, String status) {
    String normalized = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);
    if (!List.of("NEW", "CONTACTED", "CLOSED").contains(normalized)) {
      throw new IllegalArgumentException("Status must be NEW, CONTACTED or CLOSED.");
    }
    SchoolEnquiry enquiry =
        repository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
    enquiry.setStatus(normalized);
    SchoolEnquiry saved = repository.save(enquiry);
    emailNotifications.enqueue("School admission enquiry", "School discovery page", Map.of(
        "Name", saved.getName(), "Email", saved.getEmail(), "Phone", saved.getPhone(),
        "School", saved.getSchoolName(), "City", saved.getCity(), "Grade", saved.getGrade(),
        "Message", saved.getMessage() == null ? "" : saved.getMessage()));
    return saved;
  }
}

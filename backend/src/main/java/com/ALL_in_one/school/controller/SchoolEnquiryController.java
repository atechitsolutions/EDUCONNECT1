package com.ALL_in_one.school.controller;

import com.ALL_in_one.school.dto.SchoolEnquiryRequest;
import com.ALL_in_one.school.service.SchoolEnquiryService;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/school-enquiries")
public class SchoolEnquiryController {
  private final SchoolEnquiryService service;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> submit(@Valid @RequestBody SchoolEnquiryRequest request) {
    var saved = service.submit(request);
    return Map.of("id", saved.getId(), "message", "Your enquiry has been submitted.");
  }

  @GetMapping("/admin")
  public Object listForAdmin() {
    return service.list();
  }

  @PatchMapping("/admin/{id}/status")
  public Object updateStatus(@PathVariable Long id, @RequestParam String value) {
    return service.updateStatus(id, value);
  }
}

package com.ALL_in_one.school.controller;

import com.ALL_in_one.school.dto.SchoolEnquiryRequest;
import com.ALL_in_one.school.service.SchoolEnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

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
}

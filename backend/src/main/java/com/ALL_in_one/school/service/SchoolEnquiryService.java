package com.ALL_in_one.school.service;

import com.ALL_in_one.school.dto.SchoolEnquiryRequest;
import com.ALL_in_one.school.entity.SchoolEnquiry;
import com.ALL_in_one.school.repository.SchoolEnquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SchoolEnquiryService {
    private final SchoolEnquiryRepository repository;

    @Transactional
    public SchoolEnquiry submit(SchoolEnquiryRequest request) {
        SchoolEnquiry enquiry = new SchoolEnquiry();
        enquiry.setSchoolName(request.schoolName().trim());
        enquiry.setCity(request.city().trim());
        enquiry.setName(request.name().trim());
        enquiry.setEmail(request.email().trim().toLowerCase());
        enquiry.setPhone(request.phone().trim());
        enquiry.setGrade(request.grade().trim());
        enquiry.setMessage(request.message() == null ? null : request.message().trim());
        enquiry.setConsent(request.consent());
        return repository.save(enquiry);
    }
}

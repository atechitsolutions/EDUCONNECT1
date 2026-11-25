package com.ALL_in_one.collegepartner.dto;

import jakarta.validation.constraints.*;

public record AdminLeadRequest(
    @NotNull Long institutionId,
    @NotBlank @Size(max = 120) String studentName,
    @NotBlank @Email @Size(max = 180) String studentEmail,
    @NotBlank @Pattern(regexp = "[+0-9() .-]{7,40}") String studentPhone,
    @Size(max = 40) String alternativePhone,
    @NotBlank @Size(max = 160) String course,
    @Size(max = 100) String preferredDegree,
    @Size(max = 60) String studyMode,
    @Size(max = 100) String preferredCountry,
    @Size(max = 160) String currentQualification,
    @Size(max = 12) String passingYear,
    @Size(max = 180) String preferredCollege,
    @Size(max = 100) String city,
    @Size(max = 100) String state,
    @Size(max = 5000) String message,
    @NotBlank @Pattern(regexp = "ADMIN_ADDED|EXCEL_IMPORT|CAMPAIGN_ENQUIRY") String leadSource,
    @AssertTrue(
            message =
                "Documented, relevant student contact-sharing "
                    + "consent is required before assignment.")
        boolean consentGiven,
    @NotBlank @Size(max = 180) String consentReference,
    @Pattern(regexp = "LOW|NORMAL|HIGH|URGENT") String priority,
    @Pattern(regexp = "NEW|CONTACTED|FOLLOW_UP|INTERESTED|CONVERTED|CLOSED") String status,
    @Size(max = 5000) String adminNotes,
    @Pattern(regexp = "WARM_LEAD|HOT_LEAD|EXCLUSIVE_LEAD") String leadProductType) {}

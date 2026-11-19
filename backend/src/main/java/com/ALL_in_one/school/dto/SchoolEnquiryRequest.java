package com.ALL_in_one.school.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SchoolEnquiryRequest(
        @NotBlank @Size(max = 240) String schoolId,
        @NotBlank @Size(max = 180) String schoolName,
        @NotBlank @Size(max = 100) String city,
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Email @Size(max = 180) String email,
        @NotBlank @Size(max = 40) @jakarta.validation.constraints.Pattern(regexp = "^[+()0-9 .-]{7,40}$") String phone,
        @NotBlank @Size(max = 60) String grade,
        @Size(max = 2000) String message,
        @AssertTrue boolean consent
) { }

package com.ALL_in_one.referral.dto;

import jakarta.validation.constraints.*;

public record PartnerInterestRequest(
    @NotBlank @Size(max = 120) String fullName,
    @NotBlank @Email @Size(max = 180) String email,
    @NotBlank
        @Pattern(regexp = ".*\\d.*", message = "A valid phone number is required")
        @Size(max = 40)
        String phone,
    @NotBlank @Size(max = 80) String experience,
    @Size(max = 180) String collegeName,
    @Size(max = 32) String parentReferralCode,
    @AssertTrue boolean consent) {}

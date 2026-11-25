package com.ALL_in_one.referral.dto;

import jakarta.validation.constraints.*;

public record ReferralLeadRequest(
    @NotBlank @Size(max = 120) String studentName,
    @NotBlank @Email @Size(max = 180) String studentEmail,
    @Size(max = 40) String studentPhone,
    @Size(max = 180) String institutionInterest,
    @Size(max = 160) String courseInterest,
    @AssertTrue boolean consent) {}

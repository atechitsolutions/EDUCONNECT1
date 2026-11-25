package com.ALL_in_one.referral.dto;

import jakarta.validation.constraints.*;

public record PartnerDecisionRequest(
    @NotBlank @Pattern(regexp = "APPROVED|REJECTED|SUSPENDED") String status,
    @Email @Size(max = 150) String userEmail,
    Boolean subpartnersAllowed) {}

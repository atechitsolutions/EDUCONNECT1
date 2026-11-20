package com.ALL_in_one.referral.dto;
import jakarta.validation.constraints.*;
public record PartnerInterestRequest(@NotBlank @Size(max=120) String fullName,@NotBlank @Email @Size(max=180) String email,@Size(max=40) String phone,@NotBlank @Size(max=80) String experience,@Size(max=180) String collegeName,@AssertTrue boolean consent) {}

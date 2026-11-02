package com.ALL_in_one.collegepartner.dto;
import jakarta.validation.constraints.*;
public record CollegeEnquiryRequest(@NotNull Long institutionId, @NotBlank @Size(max=120) String name, @NotBlank @Email @Size(max=180) String email, @Size(max=40) String phone, @Size(max=160) String course, @Size(max=4000) String message, @AssertTrue boolean consent) { }

package com.ALL_in_one.collegepartner.dto;
import jakarta.validation.constraints.*;
public record CollegePartnerCreateRequest(@NotNull Long institutionId, @NotBlank @Email String officialEmail, @Size(max=120) String contactPerson, @Email String contactEmail, @Size(max=40) String contactNumber, @Size(max=40) String username) { }

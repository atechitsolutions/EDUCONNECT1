package com.ALL_in_one.collegepartner.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
public record CollegePasswordChangeRequest(@NotBlank String currentPassword, @NotBlank @Size(min=12,max=100) String newPassword) { }

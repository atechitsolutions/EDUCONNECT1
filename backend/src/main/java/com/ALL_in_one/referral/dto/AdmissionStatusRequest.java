package com.ALL_in_one.referral.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
public record AdmissionStatusRequest(@NotBlank @Pattern(regexp="IN_REVIEW|ADMISSION_CONFIRMED|WITHDRAWN") String status) {}

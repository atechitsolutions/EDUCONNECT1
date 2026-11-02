package com.ALL_in_one.collegepartner.dto;
import jakarta.validation.constraints.NotBlank;
public record CollegeLoginRequest(@NotBlank String username, @NotBlank String password) { }

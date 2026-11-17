package com.ALL_in_one.collegepartner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record WalletDecisionRequest(@NotBlank String decision, @NotBlank @Size(max = 1000) String note) { }

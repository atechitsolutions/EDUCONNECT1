package com.ALL_in_one.collegepartner.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record WalletAdjustmentRequest(
        @DecimalMin(value = "-500000.00") @DecimalMax(value = "500000.00") BigDecimal amount,
        @NotBlank @Size(max = 1000) String reason
) { }

package com.ALL_in_one.collegepartner.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record WalletDepositRequest(
        @NotNull @DecimalMin(value = "100.00", message = "Minimum deposit is ₹100.") @DecimalMax(value = "500000.00", message = "Maximum deposit is ₹5,00,000.") BigDecimal amount,
        @NotBlank @Size(max = 120) String paymentReference,
        @Size(max = 1000) String note
) { }

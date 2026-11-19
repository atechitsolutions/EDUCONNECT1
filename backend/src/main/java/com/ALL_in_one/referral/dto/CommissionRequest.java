package com.ALL_in_one.referral.dto;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
public record CommissionRequest(@NotNull @PositiveOrZero @Digits(integer=12,fraction=2) BigDecimal institutionalAmount,@NotNull @DecimalMin("0.00") @DecimalMax("100.00") @Digits(integer=3,fraction=2) BigDecimal partnerSharePercent,@NotNull @DecimalMin("0.00") @DecimalMax("100.00") @Digits(integer=3,fraction=2) BigDecimal directPartnerSharePercent,@NotNull Long leadId,@NotBlank @Size(max=80) String idempotencyKey,@Size(max=120) String institutionReference) {}

package com.ALL_in_one.referral.dto;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
public record PartnerTermsRequest(@NotBlank @Size(max=180) String collegeName,@NotNull @PositiveOrZero @Digits(integer=12,fraction=2) BigDecimal consultingAmount,@NotNull @DecimalMin("0.00") @DecimalMax("100.00") @Digits(integer=3,fraction=2) BigDecimal partnerSharePercent,@NotNull @DecimalMin("0.00") @DecimalMax("100.00") @Digits(integer=3,fraction=2) BigDecimal directPartnerSharePercent) {}

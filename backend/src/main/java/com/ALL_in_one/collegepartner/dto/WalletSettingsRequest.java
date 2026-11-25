package com.ALL_in_one.collegepartner.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record WalletSettingsRequest(
    @DecimalMin("0.00") @DecimalMax("100000.00") BigDecimal pricePerEnquiry,
    @Size(max = 120) String upiId,
    @Size(max = 1000) String paymentInstructions,
    String qrImageData,
    @Size(max = 60) String qrImageContentType,
    Boolean removeQrImage,
    @DecimalMin("0.00") @DecimalMax("100000.00") BigDecimal warmLeadPrice,
    @DecimalMin("0.00") @DecimalMax("100000.00") BigDecimal hotLeadPrice,
    @DecimalMin("0.00") @DecimalMax("100000.00") BigDecimal exclusiveLeadPrice,
    Boolean warmLeadEnabled,
    Boolean hotLeadEnabled,
    Boolean exclusiveLeadEnabled,
    @Size(max = 60) String warmLeadName,
    @Size(max = 60) String hotLeadName,
    @Size(max = 60) String exclusiveLeadName) {}

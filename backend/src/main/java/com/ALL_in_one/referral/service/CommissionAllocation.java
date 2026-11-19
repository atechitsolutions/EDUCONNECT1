package com.ALL_in_one.referral.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

public record CommissionAllocation(BigDecimal referringPartner, BigDecimal directPartner, BigDecimal platform) {
    public static CommissionAllocation calculate(BigDecimal institutionalAmount, BigDecimal referringPercent, BigDecimal directPercent) {
        BigDecimal total = institutionalAmount.setScale(2, RoundingMode.HALF_UP);
        BigDecimal referring = total.multiply(referringPercent).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        BigDecimal direct = total.multiply(directPercent).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        return new CommissionAllocation(referring, direct, total.subtract(referring).subtract(direct));
    }
}

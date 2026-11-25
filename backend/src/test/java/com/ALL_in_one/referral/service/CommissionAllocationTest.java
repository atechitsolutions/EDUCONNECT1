package com.ALL_in_one.referral.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

class CommissionAllocationTest {
  @Test
  void allocatesSixtyFortyCommissionInRupeesAndPaise() {
    CommissionAllocation split =
        CommissionAllocation.calculate(
            new BigDecimal("10000.00"), new BigDecimal("60.00"), BigDecimal.ZERO);
    assertEquals(new BigDecimal("6000.00"), split.referringPartner());
    assertEquals(new BigDecimal("0.00"), split.directPartner());
    assertEquals(new BigDecimal("4000.00"), split.platform());
  }

  @Test
  void allocatesASecondApprovedPartnerShareWithoutOverpayment() {
    CommissionAllocation split =
        CommissionAllocation.calculate(
            new BigDecimal("10000.00"), new BigDecimal("50.00"), new BigDecimal("10.00"));
    assertEquals(new BigDecimal("5000.00"), split.referringPartner());
    assertEquals(new BigDecimal("1000.00"), split.directPartner());
    assertEquals(new BigDecimal("4000.00"), split.platform());
  }

  @Test
  void roundsEachShareToCurrencyScaleAndLeavesRemainderOnPlatform() {
    CommissionAllocation split =
        CommissionAllocation.calculate(
            new BigDecimal("10.01"), new BigDecimal("33.33"), new BigDecimal("33.33"));
    assertEquals(new BigDecimal("3.34"), split.referringPartner());
    assertEquals(new BigDecimal("3.34"), split.directPartner());
    assertEquals(new BigDecimal("3.33"), split.platform());
  }

  @Test
  void rejectsPartnerSharesAboveCollegeCommission() {
    assertThrows(
        IllegalArgumentException.class,
        () ->
            CommissionAllocation.calculate(
                new BigDecimal("1000.00"), new BigDecimal("70.00"), new BigDecimal("31.00")));
  }
}

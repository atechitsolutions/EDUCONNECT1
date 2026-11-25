package com.ALL_in_one.referral.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "referral_commission",
    uniqueConstraints =
        @UniqueConstraint(
            name = "uk_referral_commission_idempotency",
            columnNames = "idempotency_key"),
    indexes =
        @Index(name = "ix_referral_commission_partner_status", columnList = "partner_id,status"))
@Getter
@Setter
public class ReferralCommission {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "partner_id", nullable = false)
  private AdmissionPartner partner;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "direct_partner_id")
  private AdmissionPartner directPartner;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "lead_id", nullable = false)
  private ReferralLead lead;

  @Column(name = "institutional_amount", nullable = false, precision = 14, scale = 2)
  private BigDecimal institutionalAmount;

  @Column(name = "partner_share_percent", nullable = false, precision = 5, scale = 2)
  private BigDecimal partnerSharePercent;

  @Column(name = "partner_amount", nullable = false, precision = 14, scale = 2)
  private BigDecimal partnerAmount;

  @Column(name = "direct_partner_share_percent", nullable = false, precision = 5, scale = 2)
  private BigDecimal directPartnerSharePercent = BigDecimal.ZERO;

  @Column(name = "direct_partner_amount", nullable = false, precision = 14, scale = 2)
  private BigDecimal directPartnerAmount = BigDecimal.ZERO;

  @Column(name = "platform_amount", nullable = false, precision = 14, scale = 2)
  private BigDecimal platformAmount;

  @Column(nullable = false, length = 24)
  private String status = "PENDING_REMITTANCE";

  @Column(name = "idempotency_key", nullable = false, length = 80)
  private String idempotencyKey;

  @Column(name = "institution_reference", length = 120)
  private String institutionReference;

  @Column(name = "remittance_reference", length = 120)
  private String remittanceReference;

  @Column(name = "reconciled_at")
  private LocalDateTime reconciledAt;

  @Column(name = "created_by", nullable = false, length = 150)
  private String createdBy;

  @Column(nullable = false)
  private LocalDateTime createdAt;

  @PrePersist
  void created() {
    createdAt = LocalDateTime.now();
  }
}

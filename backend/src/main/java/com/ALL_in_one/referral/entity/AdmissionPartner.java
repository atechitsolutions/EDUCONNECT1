package com.ALL_in_one.referral.entity;

import com.ALL_in_one.entity.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "admission_partner",
    uniqueConstraints = {
      @UniqueConstraint(name = "uk_admission_partner_email", columnNames = "email"),
      @UniqueConstraint(name = "uk_admission_partner_user", columnNames = "user_id"),
      @UniqueConstraint(name = "uk_admission_partner_code", columnNames = "referral_code")
    },
    indexes = @Index(name = "ix_admission_partner_parent_status", columnList = "parent_id,status"))
@Getter
@Setter
public class AdmissionPartner {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 120)
  private String fullName;

  @Column(nullable = false, length = 180)
  private String email;

  @Column(length = 40)
  private String phone;

  @Column(nullable = false, length = 80)
  private String experience;

  @Column(name = "college_name", length = 180)
  private String collegeName;

  @Column(name = "consulting_amount", precision = 14, scale = 2)
  private java.math.BigDecimal consultingAmount;

  @Column(name = "partner_share_percent", precision = 5, scale = 2)
  private java.math.BigDecimal partnerSharePercent;

  @Column(name = "direct_partner_share_percent", precision = 5, scale = 2)
  private java.math.BigDecimal directPartnerSharePercent;

  @Column(nullable = false, length = 24)
  private String status = "PENDING";

  @Column(name = "referral_code", length = 32)
  private String referralCode;

  @Column(name = "subpartners_allowed", nullable = false)
  private boolean subpartnersAllowed;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", unique = true)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "parent_id")
  private AdmissionPartner parent;

  @Column(nullable = false)
  private LocalDateTime consentAt;

  @Column(nullable = false)
  private LocalDateTime createdAt;

  @Column(nullable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  void created() {
    createdAt = updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  void updated() {
    updatedAt = LocalDateTime.now();
  }
}

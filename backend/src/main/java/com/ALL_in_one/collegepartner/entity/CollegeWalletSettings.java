package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "college_wallet_settings")
@Getter
@Setter
public class CollegeWalletSettings {
  @Id private Long id = 1L;

  @Column(name = "price_per_enquiry", nullable = false, precision = 12, scale = 2)
  private BigDecimal pricePerEnquiry = new BigDecimal("250.00");

  @Column(name = "warm_lead_price", precision = 12, scale = 2)
  private BigDecimal warmLeadPrice = new BigDecimal("100.00");

  @Column(name = "hot_lead_price", precision = 12, scale = 2)
  private BigDecimal hotLeadPrice = new BigDecimal("150.00");

  @Column(name = "exclusive_lead_price", precision = 12, scale = 2)
  private BigDecimal exclusiveLeadPrice = new BigDecimal("250.00");

  @Column(name = "warm_lead_enabled")
  private Boolean warmLeadEnabled = true;

  @Column(name = "hot_lead_enabled")
  private Boolean hotLeadEnabled = true;

  @Column(name = "exclusive_lead_enabled")
  private Boolean exclusiveLeadEnabled = true;

  @Column(name = "warm_lead_name", length = 60)
  private String warmLeadName = "Warm Lead";

  @Column(name = "hot_lead_name", length = 60)
  private String hotLeadName = "Hot Lead";

  @Column(name = "exclusive_lead_name", length = 60)
  private String exclusiveLeadName = "Exclusive Lead";

  @Column(name = "upi_id", length = 120)
  private String upiId;

  @Column(name = "payment_instructions", length = 1000)
  private String paymentInstructions;

  @Lob
  @Column(name = "qr_image_data", columnDefinition = "LONGTEXT")
  private String qrImageData;

  @Column(name = "qr_image_content_type", length = 60)
  private String qrImageContentType;

  @Column(name = "updated_by", length = 150)
  private String updatedBy;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  @PreUpdate
  void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
}

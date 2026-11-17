package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_wallet_settings")
@Getter @Setter
public class CollegeWalletSettings {
    @Id private Long id = 1L;
    @Column(name = "price_per_enquiry", nullable = false, precision = 12, scale = 2) private BigDecimal pricePerEnquiry = BigDecimal.ZERO;
    @Column(name = "upi_id", length = 120) private String upiId;
    @Column(name = "payment_instructions", length = 1000) private String paymentInstructions;
    @Lob @Column(name = "qr_image_data", columnDefinition = "LONGTEXT") private String qrImageData;
    @Column(name = "qr_image_content_type", length = 60) private String qrImageContentType;
    @Column(name = "updated_by", length = 150) private String updatedBy;
    @Column(name = "updated_at", nullable = false) private LocalDateTime updatedAt;
    @PrePersist @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }
}

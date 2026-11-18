package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_wallet_transaction", uniqueConstraints = {
        @UniqueConstraint(name = "uk_wallet_payment_reference", columnNames = "payment_reference"),
        @UniqueConstraint(name = "uk_wallet_unlock", columnNames = {"account_id", "enquiry_id", "transaction_type"})
}, indexes = @Index(name = "ix_wallet_transaction_account_time", columnList = "account_id,created_at"))
@Getter @Setter
public class CollegeWalletTransaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "account_id", nullable = false) private CollegePartnerAccount account;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "enquiry_id") private CollegeStudentEnquiry enquiry;
    @Column(name = "transaction_type", nullable = false, length = 32) private String transactionType;
    @Column(name = "lead_product_type", length = 32) private String leadProductType;
    @Column(name = "unit_price", precision = 12, scale = 2) private BigDecimal unitPrice;
    @Column(name = "quantity") private Integer quantity;
    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal amount;
    @Column(name = "balance_after", precision = 12, scale = 2) private BigDecimal balanceAfter;
    @Column(nullable = false, length = 24) private String status;
    @Column(name = "payment_reference", length = 120) private String paymentReference;
    @Column(length = 1000) private String note;
    @Column(name = "actor", nullable = false, length = 150) private String actor;
    @Column(name = "decided_by", length = 150) private String decidedBy;
    @Column(name = "decided_at") private LocalDateTime decidedAt;
    @Column(name = "related_transaction_id") private Long relatedTransactionId;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}

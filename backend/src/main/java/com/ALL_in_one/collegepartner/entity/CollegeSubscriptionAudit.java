package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_subscription_audit", indexes = @Index(name = "ix_subscription_audit_account_time", columnList = "account_id,created_at"))
@Getter @Setter
public class CollegeSubscriptionAudit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "account_id", nullable = false) private CollegePartnerAccount account;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "subscription_id") private CollegeSubscription subscription;
    @Column(nullable = false, length = 40) private String action;
    @Column(name = "admin_username", nullable = false, length = 150) private String adminUsername;
    @Column(name = "payment_reference", length = 120) private String paymentReference;
    @Column(length = 500) private String note;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}

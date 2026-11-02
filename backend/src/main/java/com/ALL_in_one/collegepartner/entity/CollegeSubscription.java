package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_subscription", indexes = @Index(name = "ix_subscription_account_status", columnList = "account_id,status,expires_at"))
@Getter @Setter
public class CollegeSubscription {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "account_id", nullable = false) private CollegePartnerAccount account;
    @Column(nullable = false, length = 20) private String status = "PENDING";
    @Column(nullable = false) private Long amountPaise = 99900L;
    private LocalDateTime startsAt;
    @Column(name = "expires_at") private LocalDateTime expiresAt;
    @Column(length = 100) private String gateway;
    @Column(length = 120) private String gatewaySubscriptionId;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}

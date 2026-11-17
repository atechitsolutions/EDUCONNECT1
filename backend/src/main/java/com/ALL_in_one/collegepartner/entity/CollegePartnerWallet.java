package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_partner_wallet", uniqueConstraints = @UniqueConstraint(name = "uk_wallet_account", columnNames = "account_id"))
@Getter @Setter
public class CollegePartnerWallet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @OneToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "account_id", nullable = false) private CollegePartnerAccount account;
    @Column(nullable = false, precision = 12, scale = 2) private BigDecimal balance = BigDecimal.ZERO;
    @Column(name = "total_added", nullable = false, precision = 12, scale = 2) private BigDecimal totalAdded = BigDecimal.ZERO;
    @Column(name = "total_spent", nullable = false, precision = 12, scale = 2) private BigDecimal totalSpent = BigDecimal.ZERO;
    @Version private long version;
    @Column(nullable = false) private LocalDateTime createdAt;
    @Column(nullable = false) private LocalDateTime updatedAt;
    @PrePersist void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }
}

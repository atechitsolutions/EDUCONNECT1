package com.ALL_in_one.referral.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "referral_lead", uniqueConstraints = @UniqueConstraint(name = "uk_referral_lead_attribution_key", columnNames = "attribution_key"), indexes = {
        @Index(name = "ix_referral_lead_partner_date", columnList = "partner_id,created_at"),
        @Index(name = "ix_referral_lead_email", columnList = "student_email")
})
@Getter @Setter
public class ReferralLead {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "partner_id", nullable = false) private AdmissionPartner partner;
    @Column(name = "student_name", nullable = false, length = 120) private String studentName;
    @Column(name = "student_email", nullable = false, length = 180) private String studentEmail;
    @Column(name = "student_phone", length = 40) private String studentPhone;
    @Column(length = 180) private String institutionInterest;
    @Column(length = 160) private String courseInterest;
    @Column(name = "consent_given", nullable = false) private boolean consentGiven;
    @Column(name = "consent_at", nullable = false) private LocalDateTime consentAt;
    @Column(name = "attribution_key", nullable = false, length = 36) private String attributionKey;
    @Column(nullable = false, length = 24) private String status = "REFERRED";
    @Column(name = "admission_confirmed_at") private LocalDateTime admissionConfirmedAt;
    @Column(nullable = false) private LocalDateTime createdAt;
    @Column(nullable = false) private LocalDateTime updatedAt;
    @PrePersist void created() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate void updated() { updatedAt = LocalDateTime.now(); }
}

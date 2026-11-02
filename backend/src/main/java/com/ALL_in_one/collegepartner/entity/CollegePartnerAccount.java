package com.ALL_in_one.collegepartner.entity;

import com.ALL_in_one.studyabroad.entity.Institution;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_partner_account", uniqueConstraints = {
        @UniqueConstraint(name = "uk_partner_username", columnNames = "username"),
        @UniqueConstraint(name = "uk_partner_institution", columnNames = "institution_id")
})
@Getter @Setter
public class CollegePartnerAccount {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;
    @Column(nullable = false, length = 40)
    private String username;
    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;
    @Column(name = "official_email", nullable = false, length = 150)
    private String officialEmail;
    @Column(name = "contact_person", length = 120)
    private String contactPerson;
    @Column(name = "contact_email", length = 150)
    private String contactEmail;
    @Column(name = "contact_number", length = 40)
    private String contactNumber;
    @Column(nullable = false)
    private boolean active = true;
    @Column(name = "must_change_password", nullable = false)
    private boolean mustChangePassword = true;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    @PrePersist void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }
}

package com.ALL_in_one.collegepartner.entity;

import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_student_enquiry", indexes = {
        @Index(name = "ix_college_enquiry_institution_date", columnList = "institution_id,created_at"),
        @Index(name = "ix_college_enquiry_student", columnList = "student_user_id")
})
@Getter @Setter
public class CollegeStudentEnquiry {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "institution_id", nullable = false) private Institution institution;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_user_id") private User student;
    @Column(name = "student_name", nullable = false, length = 120) private String studentName;
    @Column(name = "student_email", nullable = false, length = 180) private String studentEmail;
    @Column(name = "student_phone", length = 40) private String studentPhone;
    @Column(length = 160) private String course;
    @Column(name = "alternative_phone", length = 40) private String alternativePhone;
    @Column(name = "preferred_degree", length = 100) private String preferredDegree;
    @Column(name = "study_mode", length = 60) private String studyMode;
    @Column(name = "preferred_country", length = 100) private String preferredCountry;
    @Column(name = "current_qualification", length = 160) private String currentQualification;
    @Column(name = "passing_year", length = 12) private String passingYear;
    @Column(name = "preferred_college", length = 180) private String preferredCollege;
    @Column(length = 100) private String city;
    @Column(length = 100) private String state;
    @Column(columnDefinition = "TEXT") private String message;
    @Column(name = "lead_source", length = 32) private String leadSource = "WEBSITE_ENQUIRY";
    @Column(name = "lead_priority", length = 16) private String priority = "NORMAL";
    @Column(name = "admin_notes", columnDefinition = "TEXT") private String adminNotes;
    @Column(name = "consent_reference", length = 180) private String consentReference;
    @Column(name = "assigned_by", length = 120) private String assignedBy;
    @Column(name = "consent_given", nullable = false) private boolean consentGiven;
    @Column(name = "consent_at") private LocalDateTime consentAt;
    @Column(name = "consent_scope", length = 40) private String consentScope;
    @Column(name = "contact_consent_revoked_at") private LocalDateTime contactConsentRevokedAt;
    @Column(nullable = false, length = 24) private String status = "NEW";
    @Column(nullable = false) private LocalDateTime createdAt;
    @Column(nullable = false) private LocalDateTime updatedAt;
    @PostLoad void applyDefaultsToLegacyRows() { if (leadSource == null) leadSource = "WEBSITE_ENQUIRY"; if (priority == null) priority = "NORMAL"; }
    @PrePersist void onCreate() { if (leadSource == null) leadSource = "WEBSITE_ENQUIRY"; if (priority == null) priority = "NORMAL"; createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }
}

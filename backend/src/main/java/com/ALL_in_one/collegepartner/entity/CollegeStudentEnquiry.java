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
    @Column(columnDefinition = "TEXT") private String message;
    @Column(name = "consent_given", nullable = false) private boolean consentGiven;
    @Column(name = "consent_at") private LocalDateTime consentAt;
    @Column(nullable = false, length = 24) private String status = "NEW";
    @Column(nullable = false) private LocalDateTime createdAt;
    @Column(nullable = false) private LocalDateTime updatedAt;
    @PrePersist void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
    @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }
}

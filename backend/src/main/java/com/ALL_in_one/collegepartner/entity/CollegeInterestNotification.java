package com.ALL_in_one.collegepartner.entity;

import com.ALL_in_one.studyabroad.entity.Institution;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_interest_notification", uniqueConstraints = @UniqueConstraint(name = "uk_interest_notice_student_target_window", columnNames = {"student_user_id", "target_institution_id", "activity_window_key"}), indexes = @Index(name = "ix_interest_notice_target_created", columnList = "target_institution_id,created_at"))
@Getter @Setter
public class CollegeInterestNotification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "target_institution_id", nullable = false) private Institution targetInstitution;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "student_user_id", nullable = false) private com.ALL_in_one.entity.User student;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "created_by_admin_id", nullable = false) private com.ALL_in_one.entity.User createdByAdmin;
    @Column(name = "activity_window_key", nullable = false, length = 32) private String activityWindowKey;
    @Column(nullable = false, length = 120) private String title;
    @Column(nullable = false, columnDefinition = "TEXT") private String content;
    @Column(nullable = false, length = 20) private String status = "NEW";
    @Column(name = "reviewed_at") private LocalDateTime reviewedAt;
    @Column(name = "read_at") private LocalDateTime readAt;
    @Column(name = "archived_at") private LocalDateTime archivedAt;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}

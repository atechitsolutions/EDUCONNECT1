package com.ALL_in_one.collegepartner.entity;

import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_analytics_event", indexes = {
        @Index(name = "ix_college_event_institution_time", columnList = "institution_id,created_at"),
        @Index(name = "ix_college_event_visitor_time", columnList = "visitor_id,created_at"),
        @Index(name = "ix_college_event_student_time", columnList = "student_user_id,created_at")
})
@Getter @Setter
public class CollegeAnalyticsEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "institution_id", nullable = false) private Institution institution;
    @Column(nullable = false, length = 30) private String eventType;
    @Column(name = "visitor_id", length = 64) private String visitorId;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "student_user_id") private User student;
    @Column(length = 160) private String course;
    @Column(name = "source_page", length = 500) private String sourcePage;
    @Column(name = "related_enquiry_id") private Long relatedEnquiryId;
    @Column(name = "dedupe_key", length = 80, unique = true) private String dedupeKey;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}

package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_lead_audit", indexes = {
        @Index(name = "ix_college_lead_audit_lead_date", columnList = "lead_id,created_at"),
        @Index(name = "ix_college_lead_audit_action_date", columnList = "action,created_at")
})
@Getter @Setter
public class CollegeLeadAudit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "lead_id") private CollegeStudentEnquiry lead;
    @Column(nullable = false, length = 40) private String action;
    @Column(nullable = false, length = 120) private String actor;
    @Column(name = "institution_id") private Long institutionId;
    @Column(name = "import_file", length = 255) private String importFile;
    @Column(name = "record_count") private Integer recordCount;
    @Column(name = "details", length = 1000) private String details;
    @Column(nullable = false) private LocalDateTime createdAt;
    @PrePersist void onCreate() { createdAt = LocalDateTime.now(); }
}

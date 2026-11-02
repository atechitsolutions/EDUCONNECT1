package com.ALL_in_one.collegepartner.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_data_access_log", indexes = @Index(name = "ix_data_access_account_time", columnList = "account_id,created_at"))
public class StudentDataAccessLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "account_id", nullable = false) private CollegePartnerAccount account;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "enquiry_id", nullable = false) private CollegeStudentEnquiry enquiry;
    @Column(nullable = false) private LocalDateTime createdAt;
    protected StudentDataAccessLog() { }
    public StudentDataAccessLog(CollegePartnerAccount account, CollegeStudentEnquiry enquiry) { this.account = account; this.enquiry = enquiry; this.createdAt = LocalDateTime.now(); }
}

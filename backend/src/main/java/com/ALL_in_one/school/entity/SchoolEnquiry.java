package com.ALL_in_one.school.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "school_enquiries", indexes = {
        @Index(name = "ix_school_enquiry_school_date", columnList = "school_name,created_at"),
        @Index(name = "ix_school_enquiry_email", columnList = "email")
})
@Getter
@Setter
public class SchoolEnquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "school_name", nullable = false, length = 180)
    private String schoolName;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 180)
    private String email;

    @Column(nullable = false, length = 40)
    private String phone;

    @Column(nullable = false, length = 60)
    private String grade;

    @Column(length = 2000)
    private String message;

    @Column(nullable = false)
    private boolean consent;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

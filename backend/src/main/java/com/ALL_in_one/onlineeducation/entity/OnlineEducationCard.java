package com.ALL_in_one.onlineeducation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "online_education_cards")
@Getter
@Setter
public class OnlineEducationCard {

    @Id
    @Column(length = 100)
    private String id;

    @Column(nullable = false, length = 40)
    private String section;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(length = 120)
    private String subtitle;

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String link;

    @Column(length = 120)
    private String provider;

    @Column(length = 1000)
    private String subject;

    @Column(length = 1000)
    private String level;

    @Column(length = 100)
    private String qualification;

    @Column(length = 1000)
    private String mode;

    @Column(length = 80)
    private String country;

    @Column(length = 80)
    private String duration;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        if (id == null || id.isBlank()) id = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

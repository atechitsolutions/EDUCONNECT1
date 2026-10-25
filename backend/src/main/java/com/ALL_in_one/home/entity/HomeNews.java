package com.ALL_in_one.home.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "home_news")
@Getter
@Setter
public class HomeNews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 250)
    private String subtitle;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false, length = 80)
    private String category;

    @Column(length = 80)
    private String country;

    @Column(length = 250)
    private String program;

    @Column
    private Float rating;

    @Column
    private Integer reviews;

    @Column
    private Float score;

    @Column(length = 2000)
    private String highlight;

    @Column(length = 1000)
    private String imageUrl;

    @Column(length = 1000)
    private String sourceUrl;

    @Column(length = 100)
    private String actionLabel;

    /*
     * LATEST or TRENDING
     */
    @Column(nullable = false, length = 30)
    private String section = "LATEST";

    @Column(nullable = false)
    private boolean published = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
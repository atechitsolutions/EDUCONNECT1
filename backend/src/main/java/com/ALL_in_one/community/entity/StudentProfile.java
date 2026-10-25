package com.ALL_in_one.community.entity;

import com.ALL_in_one.entity.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "community_student_profiles", indexes = {
        @Index(name = "idx_community_profile_discover", columnList = "discoverable, country, university")
})
public class StudentProfile {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, unique = true, length = 40)
    private String username;

    @Column(length = 500)
    private String bio;

    @Column(length = 160)
    private String university;

    @Column(length = 160)
    private String course;

    @Column(length = 100)
    private String country;

    @Column(length = 500)
    private String interests;

    @Column(nullable = false)
    private boolean discoverable = false;

    @Column(name = "show_online", nullable = false)
    private boolean showOnline = false;

    @Column(name = "last_seen_at")
    private LocalDateTime lastSeenAt;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    void touch() { updatedAt = LocalDateTime.now(); }

    public Long getUserId() { return userId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }
    public boolean isDiscoverable() { return discoverable; }
    public void setDiscoverable(boolean discoverable) { this.discoverable = discoverable; }
    public boolean isShowOnline() { return showOnline; }
    public void setShowOnline(boolean showOnline) { this.showOnline = showOnline; }
    public LocalDateTime getLastSeenAt() { return lastSeenAt; }
    public void setLastSeenAt(LocalDateTime lastSeenAt) { this.lastSeenAt = lastSeenAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

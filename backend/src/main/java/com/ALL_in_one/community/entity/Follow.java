package com.ALL_in_one.community.entity;

import com.ALL_in_one.entity.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "community_follows",
        uniqueConstraints = @UniqueConstraint(name = "uk_community_follow", columnNames = {"follower_id", "following_id"}),
        indexes = {
                @Index(name = "idx_follow_following", columnList = "following_id, id"),
                @Index(name = "idx_follow_follower", columnList = "follower_id, id")
        })
public class Follow {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "follower_id")
    private User follower;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "following_id")
    private User following;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public User getFollower() { return follower; }
    public void setFollower(User follower) { this.follower = follower; }
    public User getFollowing() { return following; }
    public void setFollowing(User following) { this.following = following; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}

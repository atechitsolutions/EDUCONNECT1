package com.ALL_in_one.community.entity;

import com.ALL_in_one.entity.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "community_user_blocks", uniqueConstraints = @UniqueConstraint(name = "uk_community_block_pair", columnNames = "pair_key"))
public class UserBlock {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "blocker_id")
    private User blocker;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "blocked_id")
    private User blocked;
    @Column(name = "pair_key", nullable = false, length = 50)
    private String pairKey;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    public Long getId() { return id; }
    public User getBlocker() { return blocker; }
    public void setBlocker(User blocker) { this.blocker = blocker; }
    public User getBlocked() { return blocked; }
    public void setBlocked(User blocked) { this.blocked = blocked; }
    public String getPairKey() { return pairKey; }
    public void setPairKey(String pairKey) { this.pairKey = pairKey; }
}

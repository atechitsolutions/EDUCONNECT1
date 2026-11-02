package com.ALL_in_one.community.entity;

import jakarta.persistence.*;

/** Profile picture and cover image files for a student (one row per user). */
@Entity
@Table(name = "community_profile_media")
public class ProfileMedia {
    @Id
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "avatar_file", length = 80)
    private String avatarFile;
    @Column(name = "avatar_type", length = 40)
    private String avatarType;
    @Column(name = "cover_file", length = 80)
    private String coverFile;
    @Column(name = "cover_type", length = 40)
    private String coverType;
    @Column(name = "version", nullable = false)
    private long version = System.currentTimeMillis();

    public ProfileMedia() {}
    public ProfileMedia(Long userId) { this.userId = userId; }

    public Long getUserId() { return userId; }
    public String getAvatarFile() { return avatarFile; }
    public void setAvatarFile(String avatarFile) { this.avatarFile = avatarFile; }
    public String getAvatarType() { return avatarType; }
    public void setAvatarType(String avatarType) { this.avatarType = avatarType; }
    public String getCoverFile() { return coverFile; }
    public void setCoverFile(String coverFile) { this.coverFile = coverFile; }
    public String getCoverType() { return coverType; }
    public void setCoverType(String coverType) { this.coverType = coverType; }
    public long getVersion() { return version; }
    public void touch() { this.version = System.currentTimeMillis(); }
}
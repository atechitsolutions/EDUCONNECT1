package com.ALL_in_one.community.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "community_post_media",
        indexes = @Index(name = "idx_post_media_post", columnList = "post_id"))
public class PostMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "stored_name", nullable = false, length = 80)
    private String storedName;

    @Column(name = "content_type", nullable = false, length = 40)
    private String contentType;

    public Long getId() { return id; }
    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }
    public String getStoredName() { return storedName; }
    public void setStoredName(String storedName) { this.storedName = storedName; }
    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }
}
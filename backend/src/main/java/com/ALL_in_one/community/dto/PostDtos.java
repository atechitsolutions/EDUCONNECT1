package com.ALL_in_one.community.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public final class PostDtos {
    private PostDtos() {}

    public record AuthorView(
            Long userId,
            String username,
            String displayName,
            String university,
            String course,
            String country
    ) {}

    public record PostView(
            Long id,
            AuthorView author,
            String content,
            String category,
            String visibility,
            List<String> hashtags,
            List<String> images,
            int likeCount,
            int commentCount,
            int shareCount,
            boolean likedByMe,
            boolean savedByMe,
            boolean mine,
            boolean edited,
            LocalDateTime createdAt
    ) {}

    public record CommentView(
            Long id,
            Long parentId,
            AuthorView author,
            String content,
            boolean mine,
            LocalDateTime createdAt,
            List<CommentView> replies
    ) {}

    public record CommentResult(CommentView comment, int commentCount) {}

    public record PostUpdate(
            @Size(max = 5000) String content,
            String category,
            String visibility
    ) {}

    public record CommentRequest(
            @NotBlank @Size(max = 2000) String content,
            Long parentId
    ) {}
}
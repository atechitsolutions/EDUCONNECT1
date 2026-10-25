package com.ALL_in_one.community.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public final class CommunityDtos {
    private CommunityDtos() {}

    public record ProfileView(Long userId, String username, String displayName, String bio,
            String university, String course, String country, List<String> interests,
            boolean discoverable, boolean showOnline, boolean online, LocalDateTime joinedAt) {}
    public record ProfileUpdate(@Size(max = 40) String username, @Size(max = 500) String bio,
            @Size(max = 160) String university, @Size(max = 160) String course,
            @Size(max = 100) String country, @Size(max = 500) String interests,
            boolean discoverable, boolean showOnline) {}
    public record PageView<T>(List<T> content, int page, int size, long totalElements, int totalPages) {}
    public record RelationshipView(Long id, ProfileView student, String status, String direction, LocalDateTime createdAt) {}
    public record ConversationView(Long id, ProfileView student, String lastMessage, LocalDateTime lastMessageAt, long unreadCount) {}
    public record MessageView(Long id, Long senderId, String content, LocalDateTime createdAt, LocalDateTime readAt) {}
    public record CommunityChatMessageView(Long id, Long senderId, String senderName, String content, LocalDateTime createdAt) {}
    public record NotificationView(Long id, String type, String message, Long referenceId,
            String actorUsername, String actorDisplayName, LocalDateTime createdAt, boolean read) {}
    public record SendRequest(@jakarta.validation.constraints.NotNull Long userId) {}
    public record ActionRequest(@NotBlank String action) {}
    public record MessageRequest(@NotBlank @Size(max = 4000) String content) {}
    public record ReportRequest(@jakarta.validation.constraints.NotNull Long userId, @NotBlank @Size(max = 1000) String reason) {}
}

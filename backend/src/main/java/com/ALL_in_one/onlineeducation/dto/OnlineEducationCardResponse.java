package com.ALL_in_one.onlineeducation.dto;

import java.time.LocalDateTime;

public record OnlineEducationCardResponse(
        String id,
        String section,
        String title,
        String subtitle,
        String description,
        String link,
        String provider,
        String subject,
        String level,
        String qualification,
        String mode,
        String country,
        String duration,
        String image,
        boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}

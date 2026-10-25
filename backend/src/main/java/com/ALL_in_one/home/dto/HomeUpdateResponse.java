package com.ALL_in_one.home.dto;

import java.time.LocalDateTime;

public record HomeUpdateResponse(Long id, String title, String subtitle,
        String description, String type, String icon, String targetUrl,
        boolean active, int sortOrder, LocalDateTime createdAt,
        LocalDateTime updatedAt) {}

package com.ALL_in_one.home.dto;

import java.time.LocalDateTime;

public record HomeNewsResponse(

        Long id,

        String title,

        String subtitle,

        String description,

        String category,

        String country,

        String program,

        Float rating,

        Integer reviews,

        Float score,

        String highlight,

        String imageUrl,

        String sourceUrl,

        String actionLabel,

        String section,

        boolean published,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
) {
}
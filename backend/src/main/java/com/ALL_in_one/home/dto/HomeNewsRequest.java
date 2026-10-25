package com.ALL_in_one.home.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record HomeNewsRequest(

        @NotBlank
        @Size(max = 200)
        String title,

        @Size(max = 250)
        String subtitle,

        @NotBlank
        @Size(max = 2000)
        String description,

        @NotBlank
        @Size(max = 80)
        String category,

        @Size(max = 80)
        String country,

        @Size(max = 250)
        String program,

        Float rating,

        Integer reviews,

        Float score,

        @Size(max = 2000)
        String highlight,

        @Size(max = 1000)
        String imageUrl,

        @Size(max = 1000)
        String sourceUrl,

        @Size(max = 100)
        String actionLabel,

        @NotBlank
        @Pattern(
                regexp = "LATEST|TRENDING",
                message = "Section must be LATEST or TRENDING"
        )
        String section,

        @NotNull
        Boolean published
) {
}
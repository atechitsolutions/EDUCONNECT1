package com.ALL_in_one.home.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record HomeUpdateRequest(
        @NotBlank @Size(max = 200) String title,
        @NotBlank @Size(max = 250) String subtitle,
        @Size(max = 2000) String description,
        @NotBlank @Pattern(regexp = "CURRENT_AFFAIRS|SOCIAL_MEDIA") String type,
        @Size(max = 40) String icon,
        @Size(max = 1000) String targetUrl,
        @NotNull Boolean active,
        int sortOrder
) {}

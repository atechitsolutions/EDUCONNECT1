package com.ALL_in_one.onlineeducation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record OnlineEducationCardRequest(
        @Size(max = 100) String id,
        @NotBlank @Size(max = 40) @Pattern(regexp = "levels|subjects|popular|platforms|pathways|institutions|programmes") String section,
        @NotBlank @Size(max = 120) String title,
        @Size(max = 120) String subtitle,
        @Size(max = 1000) String description,
        @Size(max = 1000) String link,
        @Size(max = 120) String provider,
        @Size(max = 1000) String subject,
        @Size(max = 1000) String level,
        @Size(max = 100) String qualification,
        @Size(max = 1000) String mode,
        @Size(max = 80) String country,
        @Size(max = 80) String duration,
        @Size(max = 8_000_000) String image,
        Boolean active
) {}

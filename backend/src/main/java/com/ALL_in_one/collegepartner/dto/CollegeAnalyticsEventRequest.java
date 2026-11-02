package com.ALL_in_one.collegepartner.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
public record CollegeAnalyticsEventRequest(@NotNull Long institutionId, @NotBlank @Size(max=30) String eventType, @Size(max=160) String course) { }

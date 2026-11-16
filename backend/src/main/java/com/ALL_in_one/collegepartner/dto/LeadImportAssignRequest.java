package com.ALL_in_one.collegepartner.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record LeadImportAssignRequest(
        @NotNull Long institutionId,
        @Size(max = 255) String fileName,
        @NotEmpty @Size(max = 1000) List<@Valid AdminLeadRequest> rows
) {}

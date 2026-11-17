package com.ALL_in_one.collegepartner.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

public record WalletUnlockRequest(@NotEmpty @Size(max = 100) List<Long> enquiryIds) { }

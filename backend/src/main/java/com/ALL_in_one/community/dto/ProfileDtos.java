package com.ALL_in_one.community.dto;

import java.time.LocalDateTime;
import java.util.List;

public final class ProfileDtos {
    private ProfileDtos() {}

    /** friendStatus is one of FRIEND, INCOMING, OUTGOING or NONE (relative to the viewer). */
    public record ProfileDetail(Long userId, String username, String displayName, String bio, String university,
                                String course, String country, List<String> interests, boolean me, boolean online,
                                boolean discoverable, boolean showOnline, String friendStatus, Long friendshipId,
                                boolean following, boolean followsMe, long postCount, long followerCount, long followingCount,
                                String avatarUrl, String coverUrl, LocalDateTime joinedAt) {}

    public record PersonCard(Long userId, String username, String displayName, String bio, String avatarUrl,
                             boolean me, boolean following, boolean followsMe) {}
}

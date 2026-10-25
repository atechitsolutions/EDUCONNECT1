package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.CommunityNotification;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityNotificationRepository extends JpaRepository<CommunityNotification, Long> {
    List<CommunityNotification> findByRecipient_IdOrderByCreatedAtDesc(Long recipientId, Pageable pageable);
    long countByRecipient_IdAndReadAtIsNull(Long recipientId);
    @Modifying
    @Query("update CommunityNotification n set n.readAt = CURRENT_TIMESTAMP where n.id = :id and n.recipient.id = :userId")
    int markRead(@Param("id") Long id, @Param("userId") Long userId);
    @Modifying
    @Query("update CommunityNotification n set n.readAt = CURRENT_TIMESTAMP where n.recipient.id = :userId and n.readAt is null")
    int markAllRead(@Param("userId") Long userId);
}

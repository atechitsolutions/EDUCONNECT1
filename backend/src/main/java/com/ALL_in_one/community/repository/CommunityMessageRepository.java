package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.CommunityMessage;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityMessageRepository extends JpaRepository<CommunityMessage, Long> {
    List<CommunityMessage> findByConversation_IdAndIdGreaterThanOrderByIdAsc(Long conversationId, Long afterId, Pageable pageable);
    List<CommunityMessage> findByConversation_IdAndIdLessThanOrderByIdDesc(Long conversationId, Long beforeId, Pageable pageable);
    List<CommunityMessage> findByConversation_IdOrderByIdDesc(Long conversationId, Pageable pageable);
    long countBySender_IdAndCreatedAtAfter(Long senderId, LocalDateTime after);
    long countByConversation_IdAndSender_IdNotAndReadAtIsNull(Long conversationId, Long senderId);
    @Modifying
    @Query("update CommunityMessage m set m.readAt = :readAt where m.conversation.id = :conversationId and m.sender.id <> :readerId and m.readAt is null")
    int markReceivedRead(@Param("conversationId") Long conversationId, @Param("readerId") Long readerId, @Param("readAt") LocalDateTime readAt);
    @Query("select m from CommunityMessage m where m.conversation.id = :conversationId order by m.id desc")
    List<CommunityMessage> latest(@Param("conversationId") Long conversationId, Pageable pageable);
}

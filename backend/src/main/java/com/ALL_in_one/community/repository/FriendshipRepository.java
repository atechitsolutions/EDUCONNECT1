package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.Friendship;
import com.ALL_in_one.community.entity.FriendshipStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    Optional<Friendship> findByPairKey(String pairKey);
    List<Friendship> findByRecipient_IdAndStatusOrderByCreatedAtDesc(Long recipientId, FriendshipStatus status);
    List<Friendship> findByRequester_IdAndStatusOrderByCreatedAtDesc(Long requesterId, FriendshipStatus status);
    @Query("select f from Friendship f where f.status = :status and (f.requester.id = :userId or f.recipient.id = :userId) order by f.updatedAt desc")
    List<Friendship> findAcceptedForUser(Long userId, FriendshipStatus status);
    long countByRequester_IdAndCreatedAtAfter(Long id, LocalDateTime after);
    void deleteByPairKey(String pairKey);
}

package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.Conversation;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByPairKey(String pairKey);
    @Query("select c from Conversation c where c.participantOne.id = :userId or c.participantTwo.id = :userId order by c.updatedAt desc")
    List<Conversation> findAllForUser(Long userId);
}

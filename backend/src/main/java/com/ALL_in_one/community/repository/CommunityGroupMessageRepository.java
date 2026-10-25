package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.CommunityGroupMessage;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityGroupMessageRepository extends JpaRepository<CommunityGroupMessage, Long> {
    List<CommunityGroupMessage> findByIdGreaterThanOrderByIdAsc(Long afterId, Pageable pageable);
    List<CommunityGroupMessage> findByIdLessThanOrderByIdDesc(Long beforeId, Pageable pageable);
    List<CommunityGroupMessage> findTop100ByOrderByIdDesc();
    long countBySender_IdAndCreatedAtAfter(Long senderId, LocalDateTime after);
}

package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.UserBlock;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBlockRepository extends JpaRepository<UserBlock, Long> {
    boolean existsByPairKey(String pairKey);
    List<UserBlock> findByBlocker_IdOrderByCreatedAtDesc(Long blockerId);
    List<UserBlock> findByBlocked_Id(Long blockedId);
    void deleteByPairKeyAndBlocker_Id(String pairKey, Long blockerId);
}

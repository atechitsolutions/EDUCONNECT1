package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.Follow;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByFollower_IdAndFollowing_Id(Long followerId, Long followingId);
    boolean existsByFollower_IdAndFollowing_Id(Long followerId, Long followingId);
    long countByFollowing_Id(Long userId);
    long countByFollower_Id(Long userId);
    long countByFollower_IdAndCreatedAtAfter(Long followerId, LocalDateTime after);

    @EntityGraph(attributePaths = {"follower"})
    Page<Follow> findByFollowing_IdOrderByIdDesc(Long userId, Pageable pageable);

    @EntityGraph(attributePaths = {"following"})
    Page<Follow> findByFollower_IdOrderByIdDesc(Long userId, Pageable pageable);

    @Query("select f.following.id from Follow f where f.follower.id = :me and f.following.id in :ids")
    List<Long> followingAmong(@Param("me") Long me, @Param("ids") Collection<Long> ids);

    @Query("select f.follower.id from Follow f where f.following.id = :me and f.follower.id in :ids")
    List<Long> followersAmong(@Param("me") Long me, @Param("ids") Collection<Long> ids);
}

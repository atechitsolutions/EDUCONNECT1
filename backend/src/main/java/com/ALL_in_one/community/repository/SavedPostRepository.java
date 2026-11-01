package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.SavedPost;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SavedPostRepository
        extends JpaRepository<SavedPost, Long> {

    Optional<SavedPost> findByPost_IdAndUser_Id(
            Long postId, Long userId
    );

    long countByPost_Id(Long postId);

    void deleteByPost_Id(Long postId);

    @Query("""
        select x.post.id from SavedPost x
        where x.user.id = :userId and x.post.id in :postIds
        """)
    List<Long> savedAmong(
            @Param("userId") Long userId,
            @Param("postIds") Collection<Long> postIds
    );
}
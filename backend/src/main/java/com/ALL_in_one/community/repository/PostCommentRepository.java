package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.PostComment;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostCommentRepository
        extends JpaRepository<PostComment, Long> {

    @EntityGraph(attributePaths = {"author"})
    Page<PostComment> findByPost_IdAndParentIsNullOrderByIdAsc(
            Long postId, Pageable pageable
    );

    @EntityGraph(attributePaths = {"author"})
    List<PostComment> findByParent_IdInOrderByIdAsc(
            Collection<Long> parentIds
    );

    long countByPost_Id(Long postId);

    long countByAuthor_IdAndCreatedAtAfter(
            Long authorId, LocalDateTime after
    );

    void deleteByParent_Id(Long parentId);

    @Modifying
    @Query("""
        delete from PostComment c
        where c.post.id = :postId and c.parent is not null
        """)
    void deleteRepliesByPost(@Param("postId") Long postId);

    @Modifying
    @Query("""
        delete from PostComment c
        where c.post.id = :postId and c.parent is null
        """)
    void deleteTopLevelByPost(@Param("postId") Long postId);
}
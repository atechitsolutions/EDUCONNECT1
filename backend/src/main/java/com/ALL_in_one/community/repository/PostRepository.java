package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.Post;
import java.time.LocalDateTime;
import java.util.Collection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    long countByAuthor_IdAndCreatedAtAfter(
            Long authorId, LocalDateTime after
    );

    @EntityGraph(attributePaths = {"author"})
    @Query("""
        select p from Post p
        where (
            p.visibility = 'PUBLIC'
            or p.author.id = :me
            or (
                p.visibility = 'CONNECTIONS'
                and p.author.id in :friendIds
            )
        )
        and p.author.id not in :hiddenIds
        and (:authorId = 0 or p.author.id = :authorId)
        and (
            :savedOnly = false
            or p.id in (
                select s.post.id from SavedPost s
                where s.user.id = :me
            )
        )
        and (:category is null or p.category = :category)
        and (:tag is null or p.hashtags like concat('%,', :tag, ',%'))
        and (
            :term is null
            or lower(p.content) like lower(concat('%', :term, '%'))
        )
        and p.createdAt >= :since
        """)
    Page<Post> feed(
            @Param("me") Long me,
            @Param("friendIds") Collection<Long> friendIds,
            @Param("hiddenIds") Collection<Long> hiddenIds,
            @Param("authorId") Long authorId,
            @Param("savedOnly") boolean savedOnly,
            @Param("category") String category,
            @Param("tag") String tag,
            @Param("term") String term,
            @Param("since") LocalDateTime since,
            Pageable pageable
    );
}
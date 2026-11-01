package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.PostMedia;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostMediaRepository
        extends JpaRepository<PostMedia, Long> {

    List<PostMedia> findByPost_IdInOrderByIdAsc(
            Collection<Long> postIds
    );

    List<PostMedia> findByPost_IdOrderByIdAsc(Long postId);

    void deleteByPost_Id(Long postId);
}
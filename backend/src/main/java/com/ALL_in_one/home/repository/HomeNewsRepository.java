package com.ALL_in_one.home.repository;

import com.ALL_in_one.home.entity.HomeNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeNewsRepository extends JpaRepository<HomeNews, Long> {
    List<HomeNews> findByPublishedTrueOrderByCreatedAtDesc();
    List<HomeNews> findAllByOrderByCreatedAtDesc();
}

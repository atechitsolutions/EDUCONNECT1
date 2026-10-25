package com.ALL_in_one.home.repository;

import com.ALL_in_one.home.entity.HomeUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeUpdateRepository extends JpaRepository<HomeUpdate, Long> {

    List<HomeUpdate> findByActiveTrueOrderBySortOrderAscCreatedAtDesc();

    List<HomeUpdate> findByActiveTrueAndTypeOrderBySortOrderAscCreatedAtDesc(String type);

    List<HomeUpdate> findAllByOrderBySortOrderAscCreatedAtDesc();
}

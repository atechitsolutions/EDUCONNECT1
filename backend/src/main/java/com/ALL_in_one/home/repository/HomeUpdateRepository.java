package com.ALL_in_one.home.repository;

import com.ALL_in_one.home.entity.HomeUpdate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeUpdateRepository extends JpaRepository<HomeUpdate, Long> {

  List<HomeUpdate> findByActiveTrueOrderBySortOrderAscCreatedAtDesc();

  List<HomeUpdate> findByActiveTrueAndTypeOrderBySortOrderAscCreatedAtDesc(String type);

  List<HomeUpdate> findAllByOrderBySortOrderAscCreatedAtDesc();
}

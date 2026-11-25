package com.ALL_in_one.school.repository;

import com.ALL_in_one.school.entity.SchoolEnquiry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolEnquiryRepository extends JpaRepository<SchoolEnquiry, Long> {
  List<SchoolEnquiry> findAllByOrderByCreatedAtDesc();
}

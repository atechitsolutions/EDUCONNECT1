package com.ALL_in_one.school.repository;

import com.ALL_in_one.school.entity.SchoolEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SchoolEnquiryRepository extends JpaRepository<SchoolEnquiry, Long> {
    List<SchoolEnquiry> findAllByOrderByCreatedAtDesc();
}

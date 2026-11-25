package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegeLeadAudit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeLeadAuditRepository extends JpaRepository<CollegeLeadAudit, Long> {
  List<CollegeLeadAudit> findTop500ByOrderByCreatedAtDesc();
}

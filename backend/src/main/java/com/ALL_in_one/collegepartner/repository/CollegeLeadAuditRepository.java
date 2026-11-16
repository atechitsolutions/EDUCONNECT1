package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegeLeadAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CollegeLeadAuditRepository extends JpaRepository<CollegeLeadAudit, Long> {
    List<CollegeLeadAudit> findTop500ByOrderByCreatedAtDesc();
}

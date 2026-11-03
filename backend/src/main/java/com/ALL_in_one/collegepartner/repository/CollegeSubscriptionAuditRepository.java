package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegeSubscriptionAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CollegeSubscriptionAuditRepository extends JpaRepository<CollegeSubscriptionAudit, Long> {
    List<CollegeSubscriptionAudit> findByAccount_IdOrderByCreatedAtDesc(Long accountId);
    List<CollegeSubscriptionAudit> findAllByOrderByCreatedAtDesc();
}

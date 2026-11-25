package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegeSubscriptionAudit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeSubscriptionAuditRepository
    extends JpaRepository<CollegeSubscriptionAudit, Long> {
  List<CollegeSubscriptionAudit> findByAccount_IdOrderByCreatedAtDesc(Long accountId);

  List<CollegeSubscriptionAudit> findAllByOrderByCreatedAtDesc();
}

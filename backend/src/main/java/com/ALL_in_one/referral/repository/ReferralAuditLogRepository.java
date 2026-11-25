package com.ALL_in_one.referral.repository;

import com.ALL_in_one.referral.entity.ReferralAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferralAuditLogRepository extends JpaRepository<ReferralAuditLog, Long> {
  java.util.List<ReferralAuditLog> findAllByOrderByCreatedAtDesc();
}

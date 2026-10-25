package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.CommunityReport;
import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityReportRepository extends JpaRepository<CommunityReport, Long> {
    long countByReporter_IdAndCreatedAtAfter(Long reporterId, LocalDateTime after);
}

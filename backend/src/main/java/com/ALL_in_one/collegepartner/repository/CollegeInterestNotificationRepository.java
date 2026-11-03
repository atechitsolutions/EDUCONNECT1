package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegeInterestNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CollegeInterestNotificationRepository extends JpaRepository<CollegeInterestNotification, Long> {
    List<CollegeInterestNotification> findByTargetInstitution_IdAndArchivedAtIsNullOrderByCreatedAtDesc(Long institutionId);
    Optional<CollegeInterestNotification> findByIdAndTargetInstitution_Id(Long id, Long institutionId);
    boolean existsByStudent_IdAndTargetInstitution_IdAndActivityWindowKey(Long studentId, Long institutionId, String windowKey);
    long countByStatus(String status);
    List<CollegeInterestNotification> findAllByOrderByCreatedAtDesc();
}

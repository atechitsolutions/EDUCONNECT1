package com.ALL_in_one.collegepartner.repository;
import com.ALL_in_one.collegepartner.entity.CollegeAnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
public interface CollegeAnalyticsEventRepository extends JpaRepository<CollegeAnalyticsEvent, Long> {
    long countByInstitution_IdAndEventTypeAndCreatedAtAfter(Long institutionId, String eventType, LocalDateTime since);
    @Query("select count(distinct e.visitorId) from CollegeAnalyticsEvent e where e.institution.id=:iid and e.eventType='PAGE_VIEW' and e.createdAt >= :since and e.visitorId is not null")
    long countUniqueVisitors(@Param("iid") Long institutionId, @Param("since") LocalDateTime since);
    @Query("select count(distinct e.student.id) from CollegeAnalyticsEvent e where e.institution.id=:iid and e.eventType='PAGE_VIEW' and e.createdAt >= :since and e.student is not null")
    long countAuthenticatedStudents(@Param("iid") Long institutionId, @Param("since") LocalDateTime since);
    @Query("select e from CollegeAnalyticsEvent e where e.institution.id=:iid and e.eventType='PAGE_VIEW' order by e.createdAt desc")
    List<CollegeAnalyticsEvent> findRecentViews(@Param("iid") Long institutionId);
    long countByInstitution_Id(Long institutionId);
    long countByEventType(String eventType);
    List<CollegeAnalyticsEvent> findByStudent_IdAndCreatedAtAfterOrderByCreatedAtDesc(Long studentId, LocalDateTime since);
    boolean existsByStudent_IdAndInstitution_IdAndEventTypeAndCreatedAtAfter(Long studentId, Long institutionId, String eventType, LocalDateTime since);
    boolean existsByVisitorIdAndInstitution_IdAndEventTypeAndCreatedAtAfter(String visitorId, Long institutionId, String eventType, LocalDateTime since);
    boolean existsByDedupeKey(String dedupeKey);
    List<CollegeAnalyticsEvent> findByInstitution_IdAndEventTypeAndCreatedAtAfterOrderByCreatedAtAsc(Long institutionId, String eventType, LocalDateTime since);
    List<CollegeAnalyticsEvent> findByCreatedAtAfterAndStudentIsNotNullOrderByCreatedAtDesc(LocalDateTime since);
}

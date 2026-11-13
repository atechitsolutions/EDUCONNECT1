package com.ALL_in_one.collegepartner.repository;
import com.ALL_in_one.collegepartner.entity.CollegeStudentEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
public interface CollegeStudentEnquiryRepository extends JpaRepository<CollegeStudentEnquiry, Long> {
    List<CollegeStudentEnquiry> findByInstitution_IdOrderByCreatedAtDesc(Long institutionId);
    long countByInstitution_Id(Long institutionId);
    long countByInstitution_IdAndCreatedAtAfter(Long institutionId, LocalDateTime since);
    long countByCreatedAtAfter(LocalDateTime since);
    long countByConsentGivenTrueAndInstitution_Id(Long institutionId);
    List<CollegeStudentEnquiry> findByStudent_IdOrderByCreatedAtDesc(Long studentId);
}

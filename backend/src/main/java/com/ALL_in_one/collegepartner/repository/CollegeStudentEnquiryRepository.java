package com.ALL_in_one.collegepartner.repository;
import com.ALL_in_one.collegepartner.entity.CollegeStudentEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
public interface CollegeStudentEnquiryRepository extends JpaRepository<CollegeStudentEnquiry, Long> {
    List<CollegeStudentEnquiry> findByInstitution_IdAndAssignedByIsNotNullOrderByCreatedAtDesc(Long institutionId);
    List<CollegeStudentEnquiry> findTop200ByInstitution_IdOrderByCreatedAtDesc(Long institutionId);
    List<CollegeStudentEnquiry> findByInstitution_IdOrderByCreatedAtDesc(Long institutionId);
    long countByInstitution_Id(Long institutionId);
    long countByInstitution_IdAndCreatedAtAfter(Long institutionId, LocalDateTime since);
    long countByCreatedAtAfter(LocalDateTime since);
    long countByConsentGivenTrueAndInstitution_Id(Long institutionId);
    List<CollegeStudentEnquiry> findByStudent_IdOrderByCreatedAtDesc(Long studentId);
    boolean existsByStudentEmailIgnoreCaseAndInstitution_Id(String email, Long institutionId);
    boolean existsByStudentPhoneAndInstitution_Id(String phone, Long institutionId);
    Optional<CollegeStudentEnquiry> findFirstByInstitution_IdAndStudentEmailIgnoreCase(Long institutionId, String email);
    @org.springframework.data.jpa.repository.Query("select e from CollegeStudentEnquiry e where e.institution.id = :institutionId and replace(replace(replace(replace(replace(replace(coalesce(e.studentPhone,''), '+', ''), ' ', ''), '-', ''), '(', ''), ')', ''), '.', '') like concat('%', :phoneDigits)")
    List<CollegeStudentEnquiry> findRecentByNormalizedPhoneSuffix(@org.springframework.data.repository.query.Param("institutionId") Long institutionId, @org.springframework.data.repository.query.Param("phoneDigits") String phoneDigits);
    long countByLeadSource(String leadSource);
}

package com.ALL_in_one.referral.repository;
import com.ALL_in_one.referral.entity.AdmissionPartner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface AdmissionPartnerRepository extends JpaRepository<AdmissionPartner,Long> {
    Optional<AdmissionPartner> findByEmailIgnoreCase(String email);
    Optional<AdmissionPartner> findByReferralCodeAndStatus(String referralCode,String status);
    Optional<AdmissionPartner> findByUser_EmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCase(String email);
    Optional<AdmissionPartner> findByParent_IdAndCollegeNameIgnoreCase(Long parentId,String collegeName);
    boolean existsByReferralCode(String referralCode);
    List<AdmissionPartner> findByParent_IdOrderByCreatedAtDesc(Long parentId);
    List<AdmissionPartner> findAllByOrderByCreatedAtDesc();
}

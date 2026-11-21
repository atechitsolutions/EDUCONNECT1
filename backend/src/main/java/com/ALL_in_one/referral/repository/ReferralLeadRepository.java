package com.ALL_in_one.referral.repository;
import com.ALL_in_one.referral.entity.ReferralLead;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ReferralLeadRepository extends JpaRepository<ReferralLead,Long> {
    List<ReferralLead> findByPartner_IdOrderByCreatedAtDesc(Long partnerId);
    List<ReferralLead> findByPartner_IdInOrderByCreatedAtDesc(List<Long> partnerIds);
    List<ReferralLead> findAllByOrderByCreatedAtDesc();
    boolean existsByStudentEmailIgnoreCaseAndPartner_Id(String email,Long partnerId);
}

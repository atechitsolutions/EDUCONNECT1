package com.ALL_in_one.referral.repository;
import com.ALL_in_one.referral.entity.ReferralCommission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface ReferralCommissionRepository extends JpaRepository<ReferralCommission,Long> {
    List<ReferralCommission> findByPartner_IdOrderByCreatedAtDesc(Long partnerId);
    List<ReferralCommission> findByPartner_IdOrDirectPartner_IdOrderByCreatedAtDesc(Long partnerId,Long directPartnerId);
    List<ReferralCommission> findByPartner_IdInOrDirectPartner_IdInOrderByCreatedAtDesc(List<Long> partnerIds,List<Long> directPartnerIds);
    Optional<ReferralCommission> findByIdempotencyKey(String key);
    List<ReferralCommission> findAllByOrderByCreatedAtDesc();
}

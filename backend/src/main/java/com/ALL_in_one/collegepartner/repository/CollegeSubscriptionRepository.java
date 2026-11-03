package com.ALL_in_one.collegepartner.repository;
import com.ALL_in_one.collegepartner.entity.CollegeSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
public interface CollegeSubscriptionRepository extends JpaRepository<CollegeSubscription, Long> {
    Optional<CollegeSubscription> findFirstByAccount_IdAndStatusAndExpiresAtAfterOrderByExpiresAtDesc(Long accountId, String status, LocalDateTime now);
    long countByStatusAndExpiresAtAfter(String status, LocalDateTime now);
    Optional<CollegeSubscription> findFirstByAccount_IdOrderByCreatedAtDesc(Long accountId);
    List<CollegeSubscription> findByAccount_IdAndStatusAndExpiresAtAfterOrderByExpiresAtDesc(Long accountId, String status, LocalDateTime now);
    List<CollegeSubscription> findByAccount_IdOrderByCreatedAtDesc(Long accountId);
    List<CollegeSubscription> findAllByOrderByCreatedAtDesc();
    boolean existsByPaymentReference(String paymentReference);
}

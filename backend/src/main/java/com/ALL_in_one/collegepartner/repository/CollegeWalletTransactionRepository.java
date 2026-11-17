package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegeWalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;

public interface CollegeWalletTransactionRepository extends JpaRepository<CollegeWalletTransaction, Long> {
    List<CollegeWalletTransaction> findByAccount_IdOrderByCreatedAtDesc(Long accountId);
    List<CollegeWalletTransaction> findByAccount_IdAndStatusOrderByCreatedAtDesc(Long accountId, String status);
    List<CollegeWalletTransaction> findByAccount_IdAndTransactionTypeAndStatus(Long accountId, String type, String status);
    Optional<CollegeWalletTransaction> findByAccount_IdAndEnquiry_IdAndTransactionTypeAndStatus(Long accountId, Long enquiryId, String type, String status);
    boolean existsByAccount_IdAndPaymentReferenceIgnoreCase(Long accountId, String reference);
    boolean existsByPaymentReferenceIgnoreCase(String reference);
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select t from CollegeWalletTransaction t where t.id = :id")
    Optional<CollegeWalletTransaction> findByIdForUpdate(@Param("id") Long id);
    @Query("select t from CollegeWalletTransaction t where t.transactionType = 'DEPOSIT_REQUEST' and t.status = :status order by t.createdAt desc")
    List<CollegeWalletTransaction> findDepositRequests(@Param("status") String status);
    @Query("select t from CollegeWalletTransaction t where t.transactionType in ('LEAD_UNLOCK','DEPOSIT_CREDIT','MANUAL_ADJUSTMENT') order by t.createdAt desc")
    List<CollegeWalletTransaction> findWalletActivity();
    @Query("select t from CollegeWalletTransaction t where t.transactionType = 'LEAD_UNLOCK' order by t.createdAt desc")
    List<CollegeWalletTransaction> findUnlockedLeads();
}

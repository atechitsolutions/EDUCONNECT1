package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegePartnerWallet;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CollegePartnerWalletRepository extends JpaRepository<CollegePartnerWallet, Long> {
  Optional<CollegePartnerWallet> findByAccount_Id(Long accountId);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("select w from CollegePartnerWallet w where w.account.id = :accountId")
  Optional<CollegePartnerWallet> findByAccountIdForUpdate(@Param("accountId") Long accountId);
}

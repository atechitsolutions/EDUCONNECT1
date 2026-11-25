package com.ALL_in_one.collegepartner.repository;

import com.ALL_in_one.collegepartner.entity.CollegePartnerAccount;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CollegePartnerAccountRepository
    extends JpaRepository<CollegePartnerAccount, Long> {
  Optional<CollegePartnerAccount> findByUsernameIgnoreCase(String username);

  boolean existsByUsernameIgnoreCase(String username);

  boolean existsByUsernameIgnoreCaseAndIdNot(String username, Long id);

  boolean existsByInstitution_Id(Long institutionId);

  Optional<CollegePartnerAccount> findByUsername(String username);

  Optional<CollegePartnerAccount> findByInstitution_Id(Long institutionId);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("select a from CollegePartnerAccount a where a.id = :id")
  Optional<CollegePartnerAccount> findByIdForUpdate(@Param("id") Long id);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("select a from CollegePartnerAccount a where a.username = :username")
  Optional<CollegePartnerAccount> findByUsernameForUpdate(@Param("username") String username);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("select a from CollegePartnerAccount a where a.institution.id = :institutionId")
  Optional<CollegePartnerAccount> findByInstitutionIdForUpdate(
      @Param("institutionId") Long institutionId);
}

package com.ALL_in_one.collegepartner.repository;
import com.ALL_in_one.collegepartner.entity.CollegePartnerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface CollegePartnerAccountRepository extends JpaRepository<CollegePartnerAccount, Long> {
    Optional<CollegePartnerAccount> findByUsernameIgnoreCase(String username);
    boolean existsByUsernameIgnoreCase(String username);
    boolean existsByUsernameIgnoreCaseAndIdNot(String username, Long id);
    boolean existsByInstitution_Id(Long institutionId);
    Optional<CollegePartnerAccount> findByUsername(String username);
    Optional<CollegePartnerAccount> findByInstitution_Id(Long institutionId);
}

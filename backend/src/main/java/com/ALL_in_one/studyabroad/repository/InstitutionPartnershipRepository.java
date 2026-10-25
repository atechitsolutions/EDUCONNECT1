package com.ALL_in_one.studyabroad.repository;

import com.ALL_in_one.studyabroad.entity.InstitutionPartnership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutionPartnershipRepository extends JpaRepository<InstitutionPartnership , Long> {
}

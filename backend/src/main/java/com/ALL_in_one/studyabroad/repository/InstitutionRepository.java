package com.ALL_in_one.studyabroad.repository;

import com.ALL_in_one.studyabroad.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    List<Institution> findByActiveTrueAndStudyAbroadEnabledTrueOrderByCreatedAtDesc();

    Optional<Institution> findByIdAndActiveTrueAndStudyAbroadEnabledTrue(Long id);

    Optional<Institution> findByNameIgnoreCaseAndCountryIgnoreCase(String name, String country);

    Optional<Institution> findByDirectoryCode(String directoryCode);
}

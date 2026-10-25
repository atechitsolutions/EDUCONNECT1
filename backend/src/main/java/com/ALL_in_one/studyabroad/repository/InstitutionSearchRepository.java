package com.ALL_in_one.studyabroad.repository;

import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.studyabroad.enums.InstitutionType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstitutionSearchRepository
        extends JpaRepository<Institution, Long> {


    @Query("""
            SELECT DISTINCT i
            FROM Institution i
            WHERE i.active = true
              AND i.studyAbroadEnabled = true
              AND (
                    LOWER(i.name) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.description) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.city) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.state) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.country) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.countryCode) LIKE LOWER(CONCAT('%', :query, '%'))
                  )
            """)
    List<Institution> searchActiveInstitutions(
            @Param("query") String query,
            Pageable pageable
    );


    @Query("""
            SELECT DISTINCT i
            FROM Institution i
            WHERE i.active = true
              AND i.studyAbroadEnabled = true
              AND i.type = :type
              AND (
                    LOWER(i.name) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.description) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.city) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.state) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.country) LIKE LOWER(CONCAT('%', :query, '%'))
                    OR LOWER(i.countryCode) LIKE LOWER(CONCAT('%', :query, '%'))
                  )
            """)
    List<Institution> searchActiveInstitutionsByType(
            @Param("query") String query,
            @Param("type") InstitutionType type,
            Pageable pageable
    );


    @Query("""
            SELECT DISTINCT i
            FROM Institution i
            WHERE i.active = true
              AND i.studyAbroadEnabled = true
              AND (
                    LOWER(i.city) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.state) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.country) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.countryCode) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.address) LIKE LOWER(CONCAT('%', :location, '%'))
                  )
              AND (
                    LOWER(i.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(i.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
                  )
            """)
    List<Institution> searchActiveInstitutionsByLocation(
            @Param("location") String location,
            @Param("keyword") String keyword,
            Pageable pageable
    );


    @Query("""
            SELECT DISTINCT i
            FROM Institution i
            WHERE i.active = true
              AND i.studyAbroadEnabled = true
              AND i.type = :type
              AND (
                    LOWER(i.city) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.state) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.country) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.countryCode) LIKE LOWER(CONCAT('%', :location, '%'))
                    OR LOWER(i.address) LIKE LOWER(CONCAT('%', :location, '%'))
                  )
              AND (
                    LOWER(i.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(i.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
                  )
            """)
    List<Institution> searchActiveInstitutionsByTypeAndLocation(
            @Param("type") InstitutionType type,
            @Param("location") String location,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
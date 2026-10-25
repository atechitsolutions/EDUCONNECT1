package com.ALL_in_one.community.repository;

import com.ALL_in_one.community.entity.StudentProfile;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUsernameIgnoreCase(String username);
    boolean existsByUsernameIgnoreCase(String username);
    @Query("""
            select p from StudentProfile p join p.user u where p.discoverable = true and u.role = 'STUDENT' and u.id <> :viewerId
            and (:term is null or lower(u.fullName) like lower(concat('%', :term, '%')) or lower(p.username) like lower(concat('%', :term, '%')))
            and (:university is null or lower(p.university) like lower(concat('%', :university, '%')))
            and (:course is null or lower(p.course) like lower(concat('%', :course, '%')))
            and (:country is null or lower(p.country) like lower(concat('%', :country, '%')))
            and (:interest is null or lower(p.interests) like lower(concat('%', :interest, '%')))""")
    Page<StudentProfile> discover(@Param("viewerId") Long viewerId, @Param("term") String term,
            @Param("university") String university, @Param("course") String course,
            @Param("country") String country, @Param("interest") String interest, Pageable pageable);
}

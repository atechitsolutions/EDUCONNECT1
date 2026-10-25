package com.ALL_in_one.studyabroad.entity;


import com.ALL_in_one.studyabroad.enums.InstitutionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "institution", uniqueConstraints = @UniqueConstraint(name = "uk_institution_directory_code", columnNames = "directory_code"))
@Getter
@Setter
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    private String address;
    private String city;
    private String state;
    private String country;
    private String countryCode;

    private String website;
    private String email;
    private String phone;

    private String coverImageUrl;

    /** Stable identifier from the supplied country-wise directory. */
    @Column(name = "directory_code", length = 32)
    private String directoryCode;
    private String established;
    @Column(columnDefinition = "TEXT")
    private String tuition;
    @Column(name = "living_cost", columnDefinition = "TEXT")
    private String livingCost;
    @Column(columnDefinition = "TEXT")
    private String rankings;
    @Column(name = "popular_courses", columnDefinition = "TEXT")
    private String popularCourses;
    @Column(columnDefinition = "TEXT")
    private String scholarships;
    @Column(columnDefinition = "TEXT")
    private String intakes;
    @Column(name = "english_tests", columnDefinition = "TEXT")
    private String englishTests;
    @Column(name = "post_study_work", columnDefinition = "TEXT")
    private String postStudyWork;
    @Column(name = "data_note", columnDefinition = "TEXT")
    private String dataNote;
    @Column(name = "image_source_url", length = 1000)
    private String imageSourceUrl;
    @Column(name = "image_license", length = 255)
    private String imageLicense;
    @Column(name = "image_license_url", length = 1000)
    private String imageLicenseUrl;
    @Column(name = "image_attribution", columnDefinition = "TEXT")
    private String imageAttribution;

    @Enumerated(EnumType.STRING)
    private InstitutionType type;

    private boolean studyAbroadEnabled;
    private boolean  active;
    private boolean verified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @PrePersist
  protected void onCreate(){
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }
    @PreUpdate
       protected void onUpdate(){
        updatedAt = LocalDateTime.now();
   }

}

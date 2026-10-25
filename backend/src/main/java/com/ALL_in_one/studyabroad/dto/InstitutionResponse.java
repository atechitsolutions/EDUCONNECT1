package com.ALL_in_one.studyabroad.dto;


import com.ALL_in_one.studyabroad.enums.InstitutionType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InstitutionResponse {


   private Long  id;

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
   private String directoryCode;
   private String established;
   private String tuition;
   private String livingCost;
   private String rankings;
   private String popularCourses;
   private String scholarships;
   private String intakes;
   private String englishTests;
   private String postStudyWork;
   private String dataNote;
   private String imageSourceUrl;
   private String imageLicense;
   private String imageLicenseUrl;
   private String imageAttribution;

    private InstitutionType type;

    private boolean studyAbroadEnabled;
    private boolean active;
    private boolean verified;

    private LocalDateTime createdAt;
    private LocalDateTime  updatedAt;
}

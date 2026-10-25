package com.ALL_in_one.studyabroad.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Email")



public class Email {
    @Id
    private Long id;

  private String fullName;
  private String email;
  private Integer phoneNumber;
  private Integer currentEducation;
  private Integer graduationYear;
  private String preferedDesgination;
  private String preferedCourse;
  private String desiredStudylevel;

}

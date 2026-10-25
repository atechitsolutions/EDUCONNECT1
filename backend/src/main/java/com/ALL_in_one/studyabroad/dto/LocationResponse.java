package com.ALL_in_one.studyabroad.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class LocationResponse {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String city;
    private String state;
    private String country;
    private String countryCode;
    private Double latitude;
    private Double longitude;
    private String locationType;
    private String placeId;
}

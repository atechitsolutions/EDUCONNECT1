package com.ALL_in_one.studyabroad.entity;

import com.ALL_in_one.studyabroad.enums.PartnershipStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "institution_partnership")
@Getter
@Setter
public class InstitutionPartnership {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long  id;
    @ManyToOne
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;
    @Enumerated(EnumType.STRING)
    private PartnershipStatus status;
    private String  partnerReference;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;
    }


    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }


}

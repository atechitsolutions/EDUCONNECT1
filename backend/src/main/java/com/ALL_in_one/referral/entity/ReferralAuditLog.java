package com.ALL_in_one.referral.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
@Entity @Table(name="referral_audit_log",indexes=@Index(name="ix_referral_audit_entity_time",columnList="entity_type,entity_id,created_at")) @Getter @Setter
public class ReferralAuditLog {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(name="entity_type",nullable=false,length=32) private String entityType;
    @Column(name="entity_id",nullable=false) private Long entityId;
    @Column(nullable=false,length=64) private String action;
    @Column(nullable=false,length=180) private String actor;
    @Column(columnDefinition="TEXT") private String details;
    @Column(nullable=false) private LocalDateTime createdAt;
    @PrePersist void created(){createdAt=LocalDateTime.now();}
}

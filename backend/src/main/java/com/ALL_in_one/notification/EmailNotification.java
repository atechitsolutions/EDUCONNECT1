package com.ALL_in_one.notification;

import jakarta.persistence.*;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "email_notification_outbox", indexes = @Index(name = "idx_email_outbox_status_next", columnList = "status,next_attempt_at"))
@Getter @Setter
public class EmailNotification {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(nullable = false, length = 160) private String subject;
  @Column(nullable = false, columnDefinition = "TEXT") private String htmlBody;
  @Column(nullable = false, length = 320) private String recipient;
  @Column(nullable = false, length = 16) private String status = "PENDING";
  @Column(nullable = false) private int attempts = 0;
  @Column(nullable = false) private Instant createdAt = Instant.now();
  @Column(name = "next_attempt_at", nullable = false) private Instant nextAttemptAt = Instant.now();
  @Column(length = 500) private String lastError;
}

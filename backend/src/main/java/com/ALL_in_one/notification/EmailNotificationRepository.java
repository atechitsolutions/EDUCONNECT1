package com.ALL_in_one.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.Instant;
import java.util.List;

public interface EmailNotificationRepository extends JpaRepository<EmailNotification, Long> {
  List<EmailNotification> findTop25ByStatusAndNextAttemptAtLessThanEqualOrderByCreatedAtAsc(String status, Instant now);
  List<EmailNotification> findTop100ByOrderByCreatedAtDesc();
}

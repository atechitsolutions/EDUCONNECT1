package com.ALL_in_one.notification;

import java.util.List;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/email-notifications")
@PreAuthorize("hasRole('ADMIN')")
public class EmailNotificationAdminController {
  private final EmailNotificationService service;
  public EmailNotificationAdminController(EmailNotificationService service) { this.service = service; }
  @GetMapping
  public List<Map<String, Object>> recent() {
    return service.recentNotifications().stream().map(n -> Map.<String, Object>of(
        "id", n.getId(), "subject", n.getSubject(), "status", n.getStatus(),
        "attempts", n.getAttempts(), "createdAt", n.getCreatedAt().toString(),
        "lastError", n.getLastError() == null ? "" : n.getLastError())).toList();
  }
  @PostMapping("/{id}/retry")
  public Map<String, String> retry(@PathVariable Long id) {
    service.retry(id);
    return Map.of("status", "PENDING");
  }
}

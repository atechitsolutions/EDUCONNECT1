package com.ALL_in_one.notification;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationDispatcher {
  private final EmailNotificationService service;
  public EmailNotificationDispatcher(EmailNotificationService service) { this.service = service; }
  @Scheduled(fixedDelayString = "${app.mail.dispatch-delay-ms:15000}")
  public void dispatch() { service.deliverPending(); }
}

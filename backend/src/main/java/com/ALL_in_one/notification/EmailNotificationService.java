package com.ALL_in_one.notification;

import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmailNotificationService {
  private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);
  private final EmailNotificationRepository outbox;
  private final JavaMailSender mailSender;
  private final String recipient;
  private final String sender;

  public EmailNotificationService(EmailNotificationRepository outbox, JavaMailSender mailSender,
      @Value("${app.mail.recipient:stepinstudentsinfo@gmail.com}") String recipient,
      @Value("${spring.mail.username:}") String sender) {
    this.outbox = outbox; this.mailSender = mailSender; this.recipient = recipient; this.sender = sender;
  }

  @Transactional
  public Long enqueue(String module, String source, Map<String, ?> fields) {
    String rows = fields.entrySet().stream().filter(e -> e.getValue() != null && !e.getValue().toString().isBlank())
        .map(e -> "<tr><th style=\"text-align:left;padding:8px;border-bottom:1px solid #e5e7eb\">" + escape(e.getKey())
            + "</th><td style=\"padding:8px;border-bottom:1px solid #e5e7eb\">" + escape(e.getValue().toString()) + "</td></tr>")
        .collect(Collectors.joining());
    String html = "<div style=\"font-family:Arial,sans-serif;color:#172554;max-width:680px;margin:auto\"><h2 style=\"color:#1d4ed8\">StepInStudents · New submission</h2>"
        + "<p><b>Form:</b> " + escape(module) + "</p><p><b>Source:</b> " + escape(source) + "</p>"
        + "<p><b>Submitted:</b> " + java.time.OffsetDateTime.now().toString() + "</p><table style=\"width:100%;border-collapse:collapse\">" + rows + "</table></div>";
    EmailNotification item = new EmailNotification(); item.setSubject("[StepInStudents] New " + module + " submission");
    item.setHtmlBody(html); item.setRecipient(recipient);
    EmailNotification saved = outbox.save(item);
    saved.setHtmlBody(saved.getHtmlBody().replace("</table></div>",
        "</table><p><b>Submission ID:</b> " + saved.getId() + "</p></div>"));
    outbox.save(saved);
    return saved.getId();
  }

  @Transactional(readOnly = true)
  public java.util.List<EmailNotification> recentNotifications() {
    return outbox.findTop100ByOrderByCreatedAtDesc();
  }

  @Transactional
  public void retry(Long id) {
    EmailNotification item = outbox.findById(id).orElseThrow(() -> new IllegalArgumentException("Notification not found."));
    if (!"FAILED".equals(item.getStatus())) throw new IllegalArgumentException("Only failed notifications can be retried.");
    item.setStatus("PENDING"); item.setAttempts(0); item.setLastError(null); item.setNextAttemptAt(java.time.Instant.now());
    outbox.save(item);
  }

  @Transactional
  public void deliverPending() {
    for (EmailNotification item : outbox.findTop25ByStatusAndNextAttemptAtLessThanEqualOrderByCreatedAtAsc("PENDING", java.time.Instant.now())) {
      try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        if (sender != null && !sender.isBlank()) helper.setFrom(sender);
        helper.setTo(item.getRecipient()); helper.setSubject(item.getSubject()); helper.setText(item.getHtmlBody(), true);
        mailSender.send(message); item.setStatus("SENT"); item.setLastError(null);
      } catch (Exception ex) {
        int attempts = item.getAttempts() + 1; item.setAttempts(attempts); item.setLastError(ex.getClass().getSimpleName());
        if (attempts >= 8) item.setStatus("FAILED");
        else item.setNextAttemptAt(java.time.Instant.now().plusSeconds(Math.min(3600, 30L << Math.min(attempts, 7))));
        log.warn("Email notification {} delivery failed (attempt {})", item.getId(), attempts);
      }
      outbox.save(item);
    }
  }

  private static String escape(String value) {
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;").replace("'", "&#39;");
  }
}


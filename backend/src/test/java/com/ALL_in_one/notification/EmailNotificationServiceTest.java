package com.ALL_in_one.notification;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Map;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.javamail.JavaMailSender;

class EmailNotificationServiceTest {
  @Test void escapesSubmittedHtmlAndUsesConfiguredRecipient() {
    EmailNotificationRepository repository = mock(EmailNotificationRepository.class);
    when(repository.save(any(EmailNotification.class))).thenAnswer(call -> call.getArgument(0));
    EmailNotificationService service = new EmailNotificationService(repository, mock(JavaMailSender.class),
        "stepinstudentsinfo@gmail.com", "stepinstudentsinfo@gmail.com");
    service.enqueue("Contact enquiry", "Contact page", Map.of("Message", "<script>alert(1)</script>"));
    ArgumentCaptor<EmailNotification> captured = ArgumentCaptor.forClass(EmailNotification.class);
    verify(repository, times(2)).save(captured.capture());
    EmailNotification notice = captured.getAllValues().get(1);
    assertEquals("stepinstudentsinfo@gmail.com", notice.getRecipient());
    assertTrue(notice.getHtmlBody().contains("&lt;script&gt;alert(1)&lt;/script&gt;"));
    assertFalse(notice.getHtmlBody().contains("<script>"));
    assertEquals("PENDING", notice.getStatus());
  }
}

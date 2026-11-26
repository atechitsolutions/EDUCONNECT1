package com.ALL_in_one.notification;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.LinkedHashMap;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

class LeadSubmissionControllerTest {
  private final EmailNotificationService service = mock(EmailNotificationService.class);
  private final LeadSubmissionController controller = new LeadSubmissionController(service);

  @Test void requiresConsentAndContactableFields() {
    assertThrows(ResponseStatusException.class, () -> controller.submit(Map.of(
        "module", "Study Abroad", "source", "CTA", "fields", Map.of("phone", "+911234567890"), "consent", false)));
    verifyNoInteractions(service);
  }

  @Test void validatesEmailAndPhone() {
    assertThrows(ResponseStatusException.class, () -> controller.submit(Map.of(
        "module", "Study Abroad", "source", "CTA", "fields", Map.of("email", "bad"), "consent", true)));
    assertThrows(ResponseStatusException.class, () -> controller.submit(Map.of(
        "module", "Study Abroad", "source", "CTA", "fields", Map.of("phone", "123"), "consent", true)));
    verifyNoInteractions(service);
  }

  @Test void removesSecretFieldsAndQueuesSubmittedLead() {
    when(service.enqueue(anyString(), anyString(), anyMap())).thenReturn(91L);
    Map<String, Object> fields = new LinkedHashMap<>();
    fields.put("name", "A Student"); fields.put("email", "student@example.com");
    fields.put("password", "must-not-be-sent"); fields.put("message", "<b>Interested</b>");
    Map<String, Object> response = controller.submit(Map.of(
        "module", "Online Education", "source", "Programme card", "fields", fields, "consent", true));
    assertEquals(91L, response.get("submissionId"));
    @SuppressWarnings("unchecked") org.mockito.ArgumentCaptor<Map<String, ?>> captured =
        (org.mockito.ArgumentCaptor<Map<String, ?>>) (Object) org.mockito.ArgumentCaptor.forClass(Map.class);
    verify(service).enqueue(eq("Online Education"), eq("Programme card"), captured.capture());
    assertFalse(captured.getValue().containsKey("password"));
    assertEquals("A Student", captured.getValue().get("name"));
  }
}

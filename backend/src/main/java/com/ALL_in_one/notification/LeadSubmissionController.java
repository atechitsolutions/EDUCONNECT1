package com.ALL_in_one.notification;

import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/lead-submissions")
public class LeadSubmissionController {
  private static final Pattern SAFE_LABEL = Pattern.compile("[A-Za-z][A-Za-z0-9 _./()-]{0,79}");
  private static final Set<String> SECRET_WORDS = Set.of("password", "token", "secret", "otp", "authorization", "jwt");
  private final EmailNotificationService notifications;
  public LeadSubmissionController(EmailNotificationService notifications) { this.notifications = notifications; }

  @PostMapping
  public Map<String, Object> submit(@RequestBody Map<String, Object> request) {
    if (!Boolean.TRUE.equals(request.get("consent")))
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Consent is required to submit this enquiry.");
    String module = text(request.get("module"), 100);
    String source = text(request.get("source"), 160);
    Object raw = request.get("fields");
    if (module.isBlank() || source.isBlank() || !(raw instanceof Map<?, ?> values) || values.isEmpty() || values.size() > 30)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A valid module, source, and form data are required.");
    Map<String, Object> fields = new LinkedHashMap<>();
    values.forEach((key, value) -> {
      String name = text(key, 80);
      if (!SAFE_LABEL.matcher(name).matches()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid field name.");
      String normalized = name.toLowerCase(Locale.ROOT);
      if (SECRET_WORDS.stream().anyMatch(normalized::contains)) return;
      String fieldValue = text(value, 2000);
      if (!fieldValue.isBlank()) fields.put(name, fieldValue);
    });
    boolean hasContact = fields.keySet().stream().map(s -> s.toLowerCase(Locale.ROOT))
        .anyMatch(k -> k.equals("name") || k.contains("email") || k.contains("phone"));
    if (!hasContact) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Include a name or contact detail.");
    for (Map.Entry<String, Object> entry : fields.entrySet()) {
      String key = entry.getKey().toLowerCase(Locale.ROOT);
      String value = entry.getValue().toString();
      if (key.contains("email") && !value.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"))
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid email address.");
      if (key.contains("phone") && value.replaceAll("\\D", "").length() < 7)
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid phone number.");
    }
    Long id = notifications.enqueue(module, source, fields);
    return Map.of("status", "accepted", "submissionId", id);
  }

  private static String text(Object value, int max) {
    if (value == null) return "";
    String result = value.toString().trim();
    if (result.length() > max) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A form value is too long.");
    return result;
  }
}


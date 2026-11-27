package com.ALL_in_one.service;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GoogleIdentityService {
  private final RestClient restClient = RestClient.create();
  private final String clientId;

  public GoogleIdentityService(@Value("${app.auth.google-client-id:}") String clientId) {
    this.clientId = clientId == null ? "" : clientId.trim();
  }

  public Identity verify(String credential) {
    if (clientId.isBlank()) throw new IllegalStateException("Google sign-in is not configured yet.");
    if (credential == null || credential.isBlank() || credential.length() > 8192)
      throw new IllegalArgumentException("Google did not return a valid sign-in credential.");
    Map<String, Object> claims;
    try {
      claims = restClient.get()
          .uri(uri -> uri.scheme("https").host("oauth2.googleapis.com").path("/tokeninfo")
              .queryParam("id_token", credential).build())
          .retrieve()
          .body(new ParameterizedTypeReference<>() {});
    } catch (Exception exception) {
      throw new IllegalArgumentException("Google could not verify this sign-in. Please try again.");
    }
    if (claims == null || !clientId.equals(claims.get("aud"))
        || !"true".equalsIgnoreCase(String.valueOf(claims.get("email_verified"))))
      throw new IllegalArgumentException("Google account verification failed. Please try again.");
    String email = String.valueOf(claims.get("email") == null ? "" : claims.get("email")).trim();
    String subject = String.valueOf(claims.get("sub") == null ? "" : claims.get("sub")).trim();
    String name = String.valueOf(claims.get("name") == null ? email : claims.get("name")).trim();
    if (email.isBlank() || subject.isBlank() || name.isBlank())
      throw new IllegalArgumentException("Google did not provide the account details needed to sign in.");
    return new Identity(email, name, subject);
  }

  public record Identity(String email, String name, String subject) {}
}

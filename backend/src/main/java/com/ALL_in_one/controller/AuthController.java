package com.ALL_in_one.controller;

import com.ALL_in_one.dto.*;
import com.ALL_in_one.service.AuthService;
import com.ALL_in_one.service.PasswordResetService;
import com.ALL_in_one.service.GoogleIdentityService;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  private final PasswordResetService passwordResetService;

  private final GoogleIdentityService googleIdentityService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {

    try {

      AuthResponse response = authService.register(request);

      return ResponseEntity.status(HttpStatus.CREATED).body(response);

    } catch (IllegalArgumentException exception) {

      return ResponseEntity.badRequest().body(Map.of("message", exception.getMessage()));
    }
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {

    try {

      passwordResetService.sendResetLink(request.getEmail());

      return ResponseEntity.ok(Map.of("message", "Password reset request processed."));

    } catch (Exception exception) {

      return ResponseEntity.badRequest().body(Map.of("message", exception.getMessage()));
    }
  }

  @PostMapping("/reset-password")
  public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {

    try {

      passwordResetService.resetPassword(request.getToken(), request.getNewPassword());

      return ResponseEntity.ok(Map.of("message", "Password reset successfully."));

    } catch (Exception exception) {

      return ResponseEntity.badRequest().body(Map.of("message", exception.getMessage()));
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

    try {

      AuthResponse response = authService.login(request);

      return ResponseEntity.ok(response);

    } catch (IllegalArgumentException exception) {

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("message", exception.getMessage()));
    }
  }

  @PostMapping("/google")
  public ResponseEntity<?> google(@RequestBody Map<String, String> request) {
    try {
      GoogleIdentityService.Identity identity = googleIdentityService.verify(request.get("credential"));
      return ResponseEntity.ok(authService.loginWithGoogle(identity));
    } catch (IllegalArgumentException exception) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", exception.getMessage()));
    } catch (IllegalStateException exception) {
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of("message", exception.getMessage()));
    }
  }
}

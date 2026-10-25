package com.ALL_in_one.controller;

import com.ALL_in_one.dto.*;
import com.ALL_in_one.service.AuthService;
import com.ALL_in_one.service.PasswordResetService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final PasswordResetService passwordResetService;


    /* =====================================================
       REGISTER
       POST /api/auth/register
    ====================================================== */

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid
            @RequestBody
            RegisterRequest request
    ) {

        try {

            AuthResponse response =
                    authService.register(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        }
        catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );

        }

    }


    /* =====================================================
       FORGOT PASSWORD
       POST /api/auth/forgot-password
    ====================================================== */

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @Valid
            @RequestBody
            ForgotPasswordRequest request
    ) {

        try {

            passwordResetService.sendResetLink(
                    request.getEmail()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Password reset request processed."
                    )
            );

        }
        catch (Exception exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );

        }

    }


    /* =====================================================
       RESET PASSWORD
       POST /api/auth/reset-password
    ====================================================== */

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @Valid
            @RequestBody
            ResetPasswordRequest request
    ) {

        try {

            passwordResetService.resetPassword(
                    request.getToken(),
                    request.getNewPassword()
            );

            return ResponseEntity.ok(
                    Map.of(
                            "message",
                            "Password reset successfully."
                    )
            );

        }
        catch (Exception exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );

        }

    }


    /* =====================================================
       LOGIN
       POST /api/auth/login
    ====================================================== */

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid
            @RequestBody
            LoginRequest request
    ) {

        try {

            AuthResponse response =
                    authService.login(request);

            return ResponseEntity.ok(response);

        }
        catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );

        }

    }

}
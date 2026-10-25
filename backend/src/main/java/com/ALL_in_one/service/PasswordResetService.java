package com.ALL_in_one.service;

import com.ALL_in_one.entity.PasswordResetToken;
import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.PasswordResetTokenRepository;
import com.ALL_in_one.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;

    private final PasswordResetTokenRepository
            passwordResetTokenRepository;

    private final PasswordEncoder passwordEncoder;

    private final JavaMailSender mailSender;


    @Value("${app.frontend.url}")
    private String frontendUrl;


    public void sendResetLink(String email) {

        String normalizedEmail =
                email.trim().toLowerCase();


        User user =
                userRepository
                        .findByEmail(normalizedEmail)
                        .orElse(null);


        /*
         * Return silently when the email does not exist.
         *
         * This prevents revealing whether an account
         * exists for a particular email address.
         */

        if (user == null) {
            return;
        }


        String token =
                UUID.randomUUID().toString();


        PasswordResetToken resetToken =
                new PasswordResetToken();


        resetToken.setToken(token);

        resetToken.setUser(user);

        resetToken.setExpiresAt(
                LocalDateTime.now().plusMinutes(30)
        );

        resetToken.setUsed(false);


        passwordResetTokenRepository.save(
                resetToken
        );


        String resetLink =
                frontendUrl
                        + "/reset-password?token="
                        + token;


        SimpleMailMessage message =
                new SimpleMailMessage();


        message.setTo(
                user.getEmail()
        );


        message.setSubject(
                "EduConnect - Password Reset"
        );


        message.setText(
                "Hello "
                        + user.getFullName()
                        + ",\n\n"
                        + "We received a request to reset your EduConnect password.\n\n"
                        + "Use the following link to reset your password:\n\n"
                        + resetLink
                        + "\n\n"
                        + "This link will expire in 30 minutes.\n\n"
                        + "If you did not request this, you can ignore this email.\n\n"
                        + "Regards,\n"
                        + "EduConnect"
        );


        mailSender.send(message);

    }


    public void resetPassword(
            String token,
            String newPassword
    ) {

        PasswordResetToken resetToken =
                passwordResetTokenRepository
                        .findByToken(token)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Invalid or expired reset link."
                                        )
                        );


        if (resetToken.isUsed()) {

            throw new RuntimeException(
                    "This reset link has already been used."
            );

        }


        if (
                resetToken
                        .getExpiresAt()
                        .isBefore(LocalDateTime.now())
        ) {

            throw new RuntimeException(
                    "This reset link has expired."
            );

        }


        User user =
                resetToken.getUser();


        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );


        userRepository.save(user);


        resetToken.setUsed(true);


        passwordResetTokenRepository.save(
                resetToken
        );

    }

}
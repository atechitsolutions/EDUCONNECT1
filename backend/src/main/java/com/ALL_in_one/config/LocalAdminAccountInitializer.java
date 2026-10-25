package com.ALL_in_one.config;

import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

/** Creates a development admin only when a local config file explicitly enables it. */
@Configuration
@ConditionalOnProperty(name = "app.local-admin.enabled", havingValue = "true")
public class LocalAdminAccountInitializer {

    @Bean
    CommandLineRunner createLocalAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.local-admin.email}") String email,
            @Value("${app.local-admin.password}") String password,
            @Value("${app.local-admin.full-name:Local EduConnect Admin}") String fullName
    ) {
        return args -> {
            String normalizedEmail = email.trim().toLowerCase();
            if (userRepository.existsByEmail(normalizedEmail)) {
                System.out.println("Local admin account already exists: " + normalizedEmail);
                return;
            }

            User admin = new User();
            admin.setFullName(fullName.trim());
            admin.setEmail(normalizedEmail);
            admin.setPassword(passwordEncoder.encode(password));
            admin.setRole("ADMIN");
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);

            System.out.println("Created local development admin account: " + normalizedEmail);
        };
    }
}

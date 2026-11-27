package com.ALL_in_one.service;

import com.ALL_in_one.community.entity.StudentProfile;
import com.ALL_in_one.community.repository.StudentProfileRepository;
import com.ALL_in_one.dto.AuthResponse;
import com.ALL_in_one.dto.LoginRequest;
import com.ALL_in_one.dto.RegisterRequest;
import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;
import com.ALL_in_one.notification.EmailNotificationService;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final JwtService jwtService;

  private final StudentProfileRepository studentProfileRepository;
  private final EmailNotificationService emailNotifications;

  public AuthService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService,
      StudentProfileRepository studentProfileRepository,
      EmailNotificationService emailNotifications) {

    this.userRepository = userRepository;

    this.passwordEncoder = passwordEncoder;

    this.jwtService = jwtService;

    this.studentProfileRepository = studentProfileRepository;
    this.emailNotifications = emailNotifications;
  }

  @Transactional
  public AuthResponse register(RegisterRequest request) {

    String email = request.getEmail().trim().toLowerCase();

    if (userRepository.existsByEmail(email)) {

      throw new IllegalArgumentException("An account with this email already exists.");
    }

    String role = request.getRole().trim().toUpperCase();

    /*
       Currently only these two roles
       are available from registration.
    */

    if (!role.equals("STUDENT") && !role.equals("PARENT")) {

      throw new IllegalArgumentException("Invalid account type.");
    }

    User user = new User();

    user.setFullName(request.getFullName().trim());

    user.setEmail(email);

    user.setPassword(passwordEncoder.encode(request.getPassword()));

    user.setRole(role);

    user.setCreatedAt(LocalDateTime.now());

    User savedUser = userRepository.save(user);

    if ("STUDENT".equals(role)) {
      StudentProfile profile = new StudentProfile();
      profile.setUser(savedUser);
      profile.setUsername("student_" + savedUser.getId());
      studentProfileRepository.save(profile);
    }

    emailNotifications.enqueue("Student registration", "Account registration", Map.of(
        "Name", savedUser.getFullName(), "Email", savedUser.getEmail(), "Account type", role));
    String token = jwtService.generateToken(savedUser.getEmail());

    return new AuthResponse(
        token,
        savedUser.getId(),
        savedUser.getFullName(),
        savedUser.getEmail(),
        savedUser.getRole());
  }

  public AuthResponse login(LoginRequest request) {

    String email = request.getEmail().trim().toLowerCase();

    User user =
        userRepository
            .findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

    boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());

    if (!passwordMatches) {

      throw new IllegalArgumentException("Invalid email or password.");
    }

    String token = jwtService.generateToken(user.getEmail());

    return new AuthResponse(
        token, user.getId(), user.getFullName(), user.getEmail(), user.getRole());
  }

  @Transactional
  public AuthResponse loginWithGoogle(GoogleIdentityService.Identity identity) {
    String email = identity.email().trim().toLowerCase();
    User user = userRepository.findByEmail(email).orElseGet(() -> {
      User created = new User();
      created.setFullName(identity.name().length() > 100 ? identity.name().substring(0, 100) : identity.name());
      created.setEmail(email);
      created.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
      created.setRole("STUDENT");
      created.setCreatedAt(LocalDateTime.now());
      User saved = userRepository.save(created);
      StudentProfile profile = new StudentProfile();
      profile.setUser(saved);
      profile.setUsername("student_" + saved.getId());
      studentProfileRepository.save(profile);
      emailNotifications.enqueue("Student registration", "Google sign-in", Map.of(
          "Name", saved.getFullName(), "Email", saved.getEmail(), "Account type", saved.getRole()));
      return saved;
    });
    String token = jwtService.generateToken(user.getEmail());
    return new AuthResponse(token, user.getId(), user.getFullName(), user.getEmail(), user.getRole());
  }
}

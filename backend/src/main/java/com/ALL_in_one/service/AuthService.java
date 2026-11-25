package com.ALL_in_one.service;

import com.ALL_in_one.community.entity.StudentProfile;
import com.ALL_in_one.community.repository.StudentProfileRepository;
import com.ALL_in_one.dto.AuthResponse;
import com.ALL_in_one.dto.LoginRequest;
import com.ALL_in_one.dto.RegisterRequest;
import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  private final JwtService jwtService;

  private final StudentProfileRepository studentProfileRepository;

  public AuthService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService,
      StudentProfileRepository studentProfileRepository) {

    this.userRepository = userRepository;

    this.passwordEncoder = passwordEncoder;

    this.jwtService = jwtService;

    this.studentProfileRepository = studentProfileRepository;
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
}

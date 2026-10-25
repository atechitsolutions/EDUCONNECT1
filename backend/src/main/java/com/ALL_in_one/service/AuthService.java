package com.ALL_in_one.service;

import com.ALL_in_one.dto.AuthResponse;
import com.ALL_in_one.dto.LoginRequest;
import com.ALL_in_one.dto.RegisterRequest;
import com.ALL_in_one.entity.User;
import com.ALL_in_one.community.entity.StudentProfile;
import com.ALL_in_one.community.repository.StudentProfileRepository;
import com.ALL_in_one.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


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

            StudentProfileRepository studentProfileRepository

    ) {

        this.userRepository =
                userRepository;

        this.passwordEncoder =
                passwordEncoder;

        this.jwtService =
                jwtService;

        this.studentProfileRepository = studentProfileRepository;

    }


    /* =====================================================
       REGISTER
    ====================================================== */

    @Transactional
    public AuthResponse register(
            RegisterRequest request
    ) {


        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();


        /* -------------------------------------------------
           CHECK DUPLICATE EMAIL
        ------------------------------------------------- */

        if (
                userRepository.existsByEmail(
                        email
                )
        ) {

            throw new IllegalArgumentException(
                    "An account with this email already exists."
            );

        }


        /* -------------------------------------------------
           NORMALIZE ROLE
        ------------------------------------------------- */

        String role =
                request.getRole()
                        .trim()
                        .toUpperCase();


        /*
           Currently only these two roles
           are available from registration.
        */

        if (
                !role.equals("STUDENT")
                        &&
                        !role.equals("PARENT")
        ) {

            throw new IllegalArgumentException(
                    "Invalid account type."
            );

        }


        /* -------------------------------------------------
           CREATE USER
        ------------------------------------------------- */

        User user =
                new User();


        user.setFullName(
                request.getFullName()
                        .trim()
        );


        user.setEmail(
                email
        );


        /* -------------------------------------------------
           IMPORTANT:
           NEVER STORE RAW PASSWORD
        ------------------------------------------------- */

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        user.setRole(
                role
        );


        user.setCreatedAt(
                LocalDateTime.now()
        );


        /* -------------------------------------------------
           SAVE TO MYSQL
        ------------------------------------------------- */

        User savedUser =
                userRepository.save(
                        user
                );

        if ("STUDENT".equals(role)) {
            StudentProfile profile = new StudentProfile();
            profile.setUser(savedUser);
            profile.setUsername("student_" + savedUser.getId());
            studentProfileRepository.save(profile);
        }


        /* -------------------------------------------------
           GENERATE JWT
        ------------------------------------------------- */

        String token =
                jwtService.generateToken(
                        savedUser.getEmail()
                );


        /* -------------------------------------------------
           RETURN RESPONSE
        ------------------------------------------------- */

        return new AuthResponse(

                token,

                savedUser.getId(),

                savedUser.getFullName(),

                savedUser.getEmail(),

                savedUser.getRole()

        );

    }


    /* =====================================================
       LOGIN
    ====================================================== */

    public AuthResponse login(
            LoginRequest request
    ) {


        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();


        /* -------------------------------------------------
           FIND USER
        ------------------------------------------------- */

        User user =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "Invalid email or password."
                                        )
                        );


        /* -------------------------------------------------
           CHECK PASSWORD
        ------------------------------------------------- */

        boolean passwordMatches =
                passwordEncoder.matches(

                        request.getPassword(),

                        user.getPassword()

                );


        if (
                !passwordMatches
        ) {

            throw new IllegalArgumentException(
                    "Invalid email or password."
            );

        }


        /* -------------------------------------------------
           GENERATE TOKEN
        ------------------------------------------------- */

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );


        return new AuthResponse(

                token,

                user.getId(),

                user.getFullName(),

                user.getEmail(),

                user.getRole()

        );

    }

}

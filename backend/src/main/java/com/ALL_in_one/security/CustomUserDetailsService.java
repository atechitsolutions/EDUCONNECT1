package com.ALL_in_one.security;

import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService
        implements UserDetailsService {


    private final UserRepository userRepository;


    public CustomUserDetailsService(
            UserRepository userRepository
    ) {

        this.userRepository =
                userRepository;

    }


    @Override
    public UserDetails loadUserByUsername(
            String email
    )
            throws UsernameNotFoundException {


        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () ->
                                        new UsernameNotFoundException(
                                                "User not found"
                                        )
                        );


        return org.springframework.security.core.userdetails.User

                .withUsername(
                        user.getEmail()
                )

                .password(
                        user.getPassword()
                )

                .roles(
                        user.getRole()
                )

                .build();

    }

}
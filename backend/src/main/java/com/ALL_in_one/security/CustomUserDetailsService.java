package com.ALL_in_one.security;

import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;
import com.ALL_in_one.collegepartner.repository.CollegePartnerAccountRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService
        implements UserDetailsService {


    private final UserRepository userRepository;
    private final CollegePartnerAccountRepository collegePartnerAccountRepository;


    public CustomUserDetailsService(
            UserRepository userRepository,
            CollegePartnerAccountRepository collegePartnerAccountRepository
    ) {

        this.userRepository =
                userRepository;
        this.collegePartnerAccountRepository = collegePartnerAccountRepository;

    }


    @Override
    public UserDetails loadUserByUsername(
            String email
    )
            throws UsernameNotFoundException {


        var partner = collegePartnerAccountRepository.findByUsernameIgnoreCase(email);
        if (partner.isPresent()) {
            var account = partner.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(account.getUsername())
                    .password(account.getPasswordHash())
                    .roles("COLLEGE")
                    .disabled(!account.isActive())
                    .build();
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


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

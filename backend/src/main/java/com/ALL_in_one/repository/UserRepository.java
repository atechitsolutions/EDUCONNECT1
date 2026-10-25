package com.ALL_in_one.repository;

import com.ALL_in_one.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository
        extends JpaRepository<User, Long> {


    Optional<User> findByEmail(
            String email
    );


    boolean existsByEmail(
            String email
    );

}
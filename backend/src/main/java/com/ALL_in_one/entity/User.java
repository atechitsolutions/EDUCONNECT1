package com.ALL_in_one.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "users")
@Getter
@Setter
public class User {


    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;


    @Column(
            name = "full_name",
            nullable = false,
            length = 100
    )
    private String fullName;


    @Column(
            nullable = false,
            unique = true,
            length = 150
    )
    private String email;


    @Column(
            nullable = false,
            length = 255
    )
    private String password;


    @Column(
            nullable = false,
            length = 30
    )
    private String role;


    @Column(
            name = "created_at",
            nullable = false
    )
    private LocalDateTime createdAt;

}
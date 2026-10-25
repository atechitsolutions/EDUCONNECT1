package com.ALL_in_one;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class AllInOneApplication {
    public static void main(String[] args) {
        SpringApplication.run(AllInOneApplication.class, args);
    }
}

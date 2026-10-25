package com.ALL_in_one.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;

import java.util.Date;


@Service
public class JwtService {


    @Value("${app.jwt.secret}")
    private String secret;


    @Value("${app.jwt.expiration}")
    private long expiration;


    /* =====================================================
       SIGNING KEY
    ====================================================== */

    private SecretKey getSigningKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes(
                        StandardCharsets.UTF_8
                )
        );

    }


    /* =====================================================
       GENERATE TOKEN
    ====================================================== */

    public String generateToken(
            String email
    ) {

        Date currentDate =
                new Date();


        Date expirationDate =
                new Date(
                        currentDate.getTime()
                                + expiration
                );


        return Jwts.builder()

                .subject(
                        email
                )

                .issuedAt(
                        currentDate
                )

                .expiration(
                        expirationDate
                )

                .signWith(
                        getSigningKey()
                )

                .compact();

    }


    /* =====================================================
       EXTRACT EMAIL
    ====================================================== */

    public String extractEmail(
            String token
    ) {

        return Jwts.parser()

                .verifyWith(
                        getSigningKey()
                )

                .build()

                .parseSignedClaims(
                        token
                )

                .getPayload()

                .getSubject();

    }


    /* =====================================================
       VALIDATE TOKEN
    ====================================================== */

    public boolean isTokenValid(
            String token,
            String email
    ) {

        try {

            String tokenEmail =
                    extractEmail(
                            token
                    );


            return tokenEmail.equals(
                    email
            );

        }
        catch (Exception exception) {

            return false;

        }

    }

}
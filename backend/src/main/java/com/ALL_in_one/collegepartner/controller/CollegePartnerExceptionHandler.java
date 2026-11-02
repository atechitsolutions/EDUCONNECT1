package com.ALL_in_one.collegepartner.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.Map;
@RestControllerAdvice(assignableTypes = {CollegePartnerController.class, CollegePartnerAdminController.class, CollegeAnalyticsController.class})
public class CollegePartnerExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String,String>> credentials(BadCredentialsException exception) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid username or password.")); }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String,String>> invalidRequest(IllegalArgumentException exception) { return ResponseEntity.badRequest().body(Map.of("message", exception.getMessage())); }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> validation(MethodArgumentNotValidException exception) { String message = exception.getBindingResult().getFieldErrors().stream().findFirst().map(error -> error.getDefaultMessage()).orElse("Invalid request."); return ResponseEntity.badRequest().body(Map.of("message", message)); }
}

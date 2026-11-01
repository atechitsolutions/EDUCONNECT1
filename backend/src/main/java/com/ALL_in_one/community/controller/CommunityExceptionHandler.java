
package com.ALL_in_one.community.controller;

import jakarta.persistence.EntityNotFoundException;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = {
        CommunityController.class,
        PostController.class,
        ProfileController.class
})
public class CommunityExceptionHandler {

    // ============================================================
    // 404 - RESOURCE NOT FOUND
    // ============================================================

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> notFound(
            EntityNotFoundException exception) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "message",
                        exception.getMessage() == null
                                ? "Resource not found."
                                : exception.getMessage()
                ));
    }

    // ============================================================
    // 400 / 403 - INVALID REQUEST OR ACCESS DENIED
    // ============================================================

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> badRequest(
            IllegalArgumentException exception) {

        String message = exception.getMessage() == null
                ? "Request could not be completed."
                : exception.getMessage();

        HttpStatus status = message.contains("access is available")
                ? HttpStatus.FORBIDDEN
                : HttpStatus.BAD_REQUEST;

        return ResponseEntity
                .status(status)
                .body(Map.of("message", message));
    }

    // ============================================================
    // 400 - VALIDATION ERRORS
    // ============================================================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> invalidBody(
            MethodArgumentNotValidException exception) {

        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("Please check the submitted fields.");

        return ResponseEntity
                .badRequest()
                .body(Map.of("message", message == null
                        ? "Please check the submitted fields."
                        : message));
    }
}

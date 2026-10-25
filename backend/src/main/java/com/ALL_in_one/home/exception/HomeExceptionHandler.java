package com.ALL_in_one.home.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class HomeExceptionHandler {
    @ExceptionHandler(HomeResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleNotFound(HomeResourceNotFoundException exception) {
        return Map.of("message", exception.getMessage());
    }
}

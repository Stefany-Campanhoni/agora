package com.stefanycampanhoni.agora.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        return this.buildResponseEntity(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleUnauthorizedException(BadRequestException ex) {
        return this.buildResponseEntity(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    private ResponseEntity<String> buildResponseEntity(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(message);
    }
}

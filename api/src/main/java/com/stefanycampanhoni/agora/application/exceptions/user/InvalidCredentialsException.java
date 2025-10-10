package com.stefanycampanhoni.agora.application.exceptions.user;

import com.stefanycampanhoni.agora.application.exceptions.BadRequestException;

public class InvalidCredentialsException extends BadRequestException {
    public InvalidCredentialsException() {
        super("Invalid password.");
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
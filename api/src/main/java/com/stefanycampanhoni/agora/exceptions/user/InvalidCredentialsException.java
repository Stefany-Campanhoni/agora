package com.stefanycampanhoni.agora.exceptions.user;

import com.stefanycampanhoni.agora.exceptions.BadRequestException;

public class InvalidCredentialsException extends BadRequestException {
    public InvalidCredentialsException() {
        super("Invalid password.");
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
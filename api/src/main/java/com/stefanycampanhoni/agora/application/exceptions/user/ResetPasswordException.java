package com.stefanycampanhoni.agora.application.exceptions.user;

import com.stefanycampanhoni.agora.application.exceptions.BadRequestException;

public class ResetPasswordException extends BadRequestException {
    public ResetPasswordException() {
        super("Error in password reset process.");
    }
}

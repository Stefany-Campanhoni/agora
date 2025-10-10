package com.stefanycampanhoni.agora.application.exceptions.user;

import com.stefanycampanhoni.agora.application.exceptions.NotFoundException;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException() {
        super("User not found!");
    }
}

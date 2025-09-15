package com.stefanycampanhoni.agora.exceptions.user;

import com.stefanycampanhoni.agora.exceptions.NotFoundException;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException() {
        super("User not found!");
    }
}

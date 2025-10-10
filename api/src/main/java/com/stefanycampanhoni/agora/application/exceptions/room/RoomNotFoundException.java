package com.stefanycampanhoni.agora.application.exceptions.room;

import com.stefanycampanhoni.agora.application.exceptions.NotFoundException;

public class RoomNotFoundException extends NotFoundException {
    public RoomNotFoundException(String message) {
        super(message);
    }
}

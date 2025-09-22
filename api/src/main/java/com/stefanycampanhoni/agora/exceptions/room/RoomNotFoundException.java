package com.stefanycampanhoni.agora.exceptions.room;

import com.stefanycampanhoni.agora.exceptions.NotFoundException;

public class RoomNotFoundException extends NotFoundException {
    public RoomNotFoundException(String message) {
        super(message);
    }
}

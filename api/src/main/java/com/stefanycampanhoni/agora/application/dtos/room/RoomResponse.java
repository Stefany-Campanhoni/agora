package com.stefanycampanhoni.agora.application.dtos.room;

public record RoomResponse(
        Long id,
        String name,
        String description,
        Integer capacity,
        String location
) {
}

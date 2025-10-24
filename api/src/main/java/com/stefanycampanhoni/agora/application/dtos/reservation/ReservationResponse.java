package com.stefanycampanhoni.agora.application.dtos.reservation;

import com.stefanycampanhoni.agora.application.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.application.dtos.user.UserResponse;

import java.time.LocalDateTime;

public record ReservationResponse(
        Long id,
        RoomResponse room,
        LocalDateTime startDateTime,
        LocalDateTime endDateTime,
        UserResponse reservedBy
) {
}

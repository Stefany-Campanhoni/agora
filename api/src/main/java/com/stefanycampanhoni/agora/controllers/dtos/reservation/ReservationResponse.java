package com.stefanycampanhoni.agora.controllers.dtos.reservation;

import com.stefanycampanhoni.agora.controllers.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.controllers.dtos.user.UserResponse;

import java.time.LocalDateTime;

public record ReservationResponse(
        Long id,
        RoomResponse room,
        LocalDateTime startTime,
        LocalDateTime endTime,
        UserResponse reservedBy
) {
}

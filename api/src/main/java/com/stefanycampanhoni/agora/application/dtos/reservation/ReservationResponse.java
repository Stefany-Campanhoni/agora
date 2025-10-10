package com.stefanycampanhoni.agora.application.dtos.reservation;

import com.stefanycampanhoni.agora.application.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.application.dtos.user.UserResponse;

import java.time.LocalDateTime;

public record ReservationResponse(
        Long id,
        RoomResponse room,
        LocalDateTime startTime,
        LocalDateTime endTime,
        UserResponse reservedBy
) {
}

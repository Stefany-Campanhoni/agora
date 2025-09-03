package com.stefanycampanhoni.agora.controllers.dtos.reservation;

import com.stefanycampanhoni.agora.controllers.dtos.user.UserResponse;

import java.time.LocalDateTime;

public record ReservationResponse(
        String roomName,
        LocalDateTime startTime,
        LocalDateTime endTime,
        UserResponse reservedBy
) {
}

package com.stefanycampanhoni.agora.controllers.dtos.reservation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ReservationRequest(
        @NotBlank
        String roomName,

        @NotNull
        LocalDateTime startTime,

        @NotNull
        LocalDateTime endTime
) {
}

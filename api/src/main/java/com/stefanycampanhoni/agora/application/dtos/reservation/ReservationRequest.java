package com.stefanycampanhoni.agora.application.dtos.reservation;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ReservationRequest(
        @NotNull
        Long roomId,

        @NotNull
        LocalDateTime startTime,

        @NotNull
        LocalDateTime endTime
) {
}

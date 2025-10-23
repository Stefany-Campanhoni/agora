package com.stefanycampanhoni.agora.application.dtos.reservation;

import java.time.LocalDateTime;

public record SimpleReservationResponse(
        LocalDateTime startTime,
        LocalDateTime endTime
) {
}

package com.stefanycampanhoni.agora.application.dtos.reservation;

import java.util.List;

public record ReservationListResponse(
        List<ReservationResponse> items
) {
}

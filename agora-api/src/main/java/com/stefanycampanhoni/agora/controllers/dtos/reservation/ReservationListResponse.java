package com.stefanycampanhoni.agora.controllers.dtos.reservation;

import java.util.List;

public record ReservationListResponse(
        List<ReservationResponse> items
) {
}

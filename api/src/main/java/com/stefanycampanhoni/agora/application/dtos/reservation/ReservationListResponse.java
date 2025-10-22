package com.stefanycampanhoni.agora.application.dtos.reservation;

import java.util.ArrayList;
import java.util.List;

public record ReservationListResponse(
        List<ReservationResponse> items
) {
    public ReservationListResponse() {
        this(new ArrayList<>());
    }
}

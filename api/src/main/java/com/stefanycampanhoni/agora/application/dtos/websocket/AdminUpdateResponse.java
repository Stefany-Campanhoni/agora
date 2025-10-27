package com.stefanycampanhoni.agora.application.dtos.websocket;

public record AdminUpdateResponse(
        Long userQuantity,
        Long roomQuantity,
        Long reservationQuantity
) {
}

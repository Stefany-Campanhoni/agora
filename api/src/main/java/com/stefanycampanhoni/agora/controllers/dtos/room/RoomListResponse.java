package com.stefanycampanhoni.agora.controllers.dtos.room;

import java.util.List;

public record RoomListResponse(
        List<RoomResponse> rooms
) {
}

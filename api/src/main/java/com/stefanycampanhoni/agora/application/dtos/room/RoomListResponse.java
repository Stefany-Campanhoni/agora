package com.stefanycampanhoni.agora.application.dtos.room;

import java.util.List;

public record RoomListResponse(
        List<RoomResponse> rooms
) {
}

package com.stefanycampanhoni.agora.application.mappers;

import com.stefanycampanhoni.agora.application.dtos.room.RoomListResponse;
import com.stefanycampanhoni.agora.application.dtos.room.RoomRequest;
import com.stefanycampanhoni.agora.application.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.domain.entities.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoomMapper {

    @Mapping(target = "id", ignore = true)
    Room toRoom(RoomRequest roomRequest);

    RoomResponse toRoomResponse(Room room);

    default RoomListResponse toRoomListResponse(List<Room> rooms) {
        return new RoomListResponse(
            rooms.stream()
                .map(this::toRoomResponse)
                .toList()
        );
    }
}

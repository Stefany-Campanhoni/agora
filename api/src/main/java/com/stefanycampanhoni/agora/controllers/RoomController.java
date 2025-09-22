package com.stefanycampanhoni.agora.controllers;

import com.stefanycampanhoni.agora.controllers.dtos.room.RoomListResponse;
import com.stefanycampanhoni.agora.controllers.dtos.room.RoomRequest;
import com.stefanycampanhoni.agora.controllers.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.controllers.mappers.RoomMapper;
import com.stefanycampanhoni.agora.models.Room;
import com.stefanycampanhoni.agora.services.RoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/rooms")
public class RoomController {

    @Autowired
    private RoomService service;

    @Autowired
    private RoomMapper roomMapper;

    @GetMapping
    public ResponseEntity<RoomListResponse> getAllRooms() {
        List<Room> rooms = service.getAllRooms();
        RoomListResponse response = roomMapper.toRoomListResponse(rooms);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long id) {
        Room room = service.getRoomById(id);
        RoomResponse response = roomMapper.toRoomResponse(room);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest roomRequest) {
        Room room = roomMapper.toRoom(roomRequest);
        Room createdRoom = service.createRoom(room);
        RoomResponse response = roomMapper.toRoomResponse(createdRoom);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long id,
                                                   @Valid @RequestBody RoomRequest roomRequest) {
        Room roomUpdates = roomMapper.toRoom(roomRequest);
        Room updatedRoom = service.updateRoom(id, roomUpdates);
        RoomResponse response = roomMapper.toRoomResponse(updatedRoom);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        service.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}

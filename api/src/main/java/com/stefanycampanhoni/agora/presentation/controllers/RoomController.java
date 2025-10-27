package com.stefanycampanhoni.agora.presentation.controllers;

import com.stefanycampanhoni.agora.application.dtos.room.RoomListResponse;
import com.stefanycampanhoni.agora.application.dtos.room.RoomRequest;
import com.stefanycampanhoni.agora.application.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.application.mappers.RoomMapper;
import com.stefanycampanhoni.agora.application.services.RoomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/rooms")
public class RoomController {

    @Autowired
    private RoomService service;

    @Autowired
    private RoomMapper roomMapper;

    @GetMapping
    public ResponseEntity<RoomListResponse> getAllRooms() {
        RoomListResponse response = service.getAllRooms();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long id) {
        RoomResponse response = roomMapper.toRoomResponse(service.getRoomById(id));
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest roomRequest) {
        RoomResponse response = service.createRoom(roomRequest);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long id,
                                                   @Valid @RequestBody RoomRequest roomRequest) {
        RoomResponse response = service.updateRoom(id, roomRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        service.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}

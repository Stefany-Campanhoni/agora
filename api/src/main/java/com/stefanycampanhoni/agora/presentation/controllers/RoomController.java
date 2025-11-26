package com.stefanycampanhoni.agora.presentation.controllers;

import com.stefanycampanhoni.agora.application.dtos.room.RoomListResponse;
import com.stefanycampanhoni.agora.application.dtos.room.RoomRequest;
import com.stefanycampanhoni.agora.application.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.application.mappers.RoomMapper;
import com.stefanycampanhoni.agora.application.services.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/rooms")
@Tag(name = "Salas", description = "Endpoints para gerenciamento de salas de reunião")
public class RoomController {

    @Autowired
    private RoomService service;

    @Autowired
    private RoomMapper roomMapper;

    @GetMapping
    @Operation(summary = "Listar salas", description = "Retorna todas as salas de reunião cadastradas")
    public ResponseEntity<RoomListResponse> getAllRooms() {
        RoomListResponse response = service.getAllRooms();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar sala por ID", description = "Retorna os detalhes de uma sala específica")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long id) {
        RoomResponse response = roomMapper.toRoomResponse(service.getRoomById(id));
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @Operation(summary = "Criar sala", description = "Cria uma nova sala de reunião")
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest roomRequest) {
        RoomResponse response = service.createRoom(roomRequest);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar sala", description = "Atualiza os dados de uma sala existente")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long id,
                                                   @Valid @RequestBody RoomRequest roomRequest) {
        RoomResponse response = service.updateRoom(id, roomRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir sala", description = "Remove uma sala de reunião do sistema")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        service.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}

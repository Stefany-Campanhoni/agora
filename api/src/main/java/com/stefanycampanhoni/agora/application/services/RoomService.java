package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.application.dtos.room.RoomListResponse;
import com.stefanycampanhoni.agora.application.dtos.room.RoomRequest;
import com.stefanycampanhoni.agora.application.dtos.room.RoomResponse;
import com.stefanycampanhoni.agora.application.exceptions.room.RoomNotFoundException;
import com.stefanycampanhoni.agora.application.mappers.RoomMapper;
import com.stefanycampanhoni.agora.domain.entities.Room;
import com.stefanycampanhoni.agora.domain.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    @Autowired
    private RoomRepository repository;

    @Autowired
    private RoomMapper mapper;

    public RoomListResponse getAllRooms() {
        var rooms = repository.findAll();
        return mapper.toRoomListResponse(rooms);
    }

    public Room getRoomById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RoomNotFoundException("Room not found with id: " + id));
    }

    public Room getRoomByIdEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RoomNotFoundException("Room not found with id: " + id));
    }

    public Room getRoomByName(String name) {
        return repository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RoomNotFoundException("Room not found with name: " + name));
    }

    public RoomResponse createRoom(RoomRequest request) {
        var room = mapper.toRoom(request);
        return mapper.toRoomResponse(repository.save(room));
    }

    public RoomResponse updateRoom(Long id, RoomRequest request) {
        var existingRoom = getRoomByIdEntity(id);

        existingRoom.setName(request.name());
        existingRoom.setDescription(request.description());
        existingRoom.setCapacity(request.capacity());
        existingRoom.setLocation(request.location());

        return mapper.toRoomResponse(repository.save(existingRoom));
    }

    public void deleteRoom(Long id) {
        if (!repository.existsById(id)) {
            throw new RoomNotFoundException("Room not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public long countRooms() {
        return repository.count();
    }
}

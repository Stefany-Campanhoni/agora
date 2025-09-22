package com.stefanycampanhoni.agora.services;

import com.stefanycampanhoni.agora.exceptions.BadRequestException;
import com.stefanycampanhoni.agora.exceptions.NotFoundException;
import com.stefanycampanhoni.agora.exceptions.room.RoomNotFoundException;
import com.stefanycampanhoni.agora.models.Room;
import com.stefanycampanhoni.agora.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository repository;

    public List<Room> getAllRooms() {
        return repository.findAll();
    }

    public Room getRoomById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RoomNotFoundException("Room not found with id: " + id));
    }

    public Room getRoomByName(String name) {
        return repository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RoomNotFoundException("Room not found with name: " + name));
    }

    public Room createRoom(Room room) {
        return repository.save(room);
    }

    public Room updateRoom(Long id, Room roomUpdates) {
        Room existingRoom = getRoomById(id);

        existingRoom.setName(roomUpdates.getName());
        existingRoom.setDescription(roomUpdates.getDescription());
        existingRoom.setCapacity(roomUpdates.getCapacity());
        existingRoom.setLocation(roomUpdates.getLocation());

        return repository.save(existingRoom);
    }

    public void deleteRoom(Long id) {
        if (!repository.existsById(id)) {
            throw new RoomNotFoundException("Room not found with id: " + id);
        }
        repository.deleteById(id);
    }
}

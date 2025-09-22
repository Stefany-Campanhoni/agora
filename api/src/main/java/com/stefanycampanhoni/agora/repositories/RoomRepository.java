package com.stefanycampanhoni.agora.repositories;

import com.stefanycampanhoni.agora.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}

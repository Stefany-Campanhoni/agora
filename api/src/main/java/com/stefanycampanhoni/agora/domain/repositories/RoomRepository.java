package com.stefanycampanhoni.agora.domain.repositories;

import com.stefanycampanhoni.agora.domain.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}

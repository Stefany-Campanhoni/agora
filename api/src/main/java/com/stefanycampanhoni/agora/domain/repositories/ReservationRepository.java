package com.stefanycampanhoni.agora.domain.repositories;

import com.stefanycampanhoni.agora.domain.entities.Reservation;
import com.stefanycampanhoni.agora.domain.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRoom(Room room);
    List<Reservation> findByRoomId(Long roomId);
}

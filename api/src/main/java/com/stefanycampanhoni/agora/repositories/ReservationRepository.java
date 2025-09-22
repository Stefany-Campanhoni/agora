package com.stefanycampanhoni.agora.repositories;

import com.stefanycampanhoni.agora.models.Reservation;
import com.stefanycampanhoni.agora.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRoom(Room room);
    List<Reservation> findByRoomId(Long roomId);
}

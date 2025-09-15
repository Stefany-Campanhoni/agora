package com.stefanycampanhoni.agora.repositories;

import com.stefanycampanhoni.agora.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRoomNameIgnoreCase(String roomName);
}

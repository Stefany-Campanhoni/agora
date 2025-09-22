package com.stefanycampanhoni.agora.services;

import com.stefanycampanhoni.agora.models.Reservation;
import com.stefanycampanhoni.agora.models.Room;
import com.stefanycampanhoni.agora.models.User;
import com.stefanycampanhoni.agora.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private RoomService roomService;

    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    public Reservation createReservation(Reservation reservation, User user, Long roomId) {
        Room room = roomService.getRoomById(roomId);
        reservation.setRoom(room);
        reservation.setReservedBy(user);

        if (!isValidReservation(reservation)) {
            throw new IllegalArgumentException("Invalid reservation: Time slot is either invalid or overlaps with an existing reservation.");
        }

        return repository.save(reservation);
    }

    public boolean isValidReservation(Reservation reservation) {
        LocalDateTime start = reservation.getStartTime();
        LocalDateTime end = reservation.getEndTime();
        Room room = reservation.getRoom();

        if (start.isAfter(end) || start.isEqual(end)) {
            return false;
        }

        return !isOverlapping(start, end, room);
    }

    private boolean isOverlapping(LocalDateTime start, LocalDateTime end, Room room) {
        return repository.findByRoom(room).stream()
                .anyMatch(existingReservation ->
                        start.isBefore(existingReservation.getEndTime()) &&
                                end.isAfter(existingReservation.getStartTime()));
    }
}

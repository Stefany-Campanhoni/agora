package com.stefanycampanhoni.agora.services;

import com.stefanycampanhoni.agora.models.Reservation;
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

    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    public Reservation createReservation(Reservation reservation, User user) {
        reservation.setReservedBy(user);

        if (!isValidReservation(reservation)) {
            throw new IllegalArgumentException("Invalid reservation: Time slot is either invalid or overlaps with an existing reservation.");
        }

        return repository.save(reservation);
    }

    public boolean isValidReservation(Reservation reservation) {
        LocalDateTime start = reservation.getStartTime();
        LocalDateTime end = reservation.getEndTime();
        String roomName = reservation.getRoomName();

        if (start.isAfter(end) || start.isEqual(end)) {
            return false;
        }

        return !isOverlapping(start, end, roomName);
    }

    private boolean isOverlapping(LocalDateTime start, LocalDateTime end, String roomName) {
        return repository.findByRoomNameIgnoreCase(roomName).stream()
                .anyMatch(existingReservation ->
                        start.isBefore(existingReservation.getEndTime()) &&
                                end.isAfter(existingReservation.getStartTime()));
    }
}

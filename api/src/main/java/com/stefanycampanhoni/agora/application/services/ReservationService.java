package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationListResponse;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationRequest;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationResponse;
import com.stefanycampanhoni.agora.application.mappers.ReservationMapper;
import com.stefanycampanhoni.agora.domain.entities.Reservation;
import com.stefanycampanhoni.agora.domain.entities.Room;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.domain.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ReservationMapper mapper;

    public ReservationListResponse getAllReservations() {
        var reservations = repository.findAll();
        return mapper.toReservationListResponse(reservations);
    }

    public ReservationResponse createReservation(ReservationRequest request, User user, Long roomId) {
        var reservation = mapper.toReservation(request);

        Room room = roomService.getRoomById(roomId);
        reservation.setRoom(room);
        reservation.setReservedBy(user);

        if (!isValidReservation(reservation)) {
            throw new IllegalArgumentException("Invalid reservation: Time slot is either invalid or overlaps with an existing reservation.");
        }

        return mapper.toReservationResponse(repository.save(reservation));
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

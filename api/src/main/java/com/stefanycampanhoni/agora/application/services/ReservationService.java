package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationListResponse;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationRequest;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationResponse;
import com.stefanycampanhoni.agora.application.dtos.reservation.SimpleReservationResponse;
import com.stefanycampanhoni.agora.application.mappers.ReservationMapper;
import com.stefanycampanhoni.agora.domain.entities.Reservation;
import com.stefanycampanhoni.agora.domain.entities.Room;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.domain.repositories.ReservationRepository;
import com.stefanycampanhoni.agora.infra.security.UserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ReservationMapper mapper;

    public List<SimpleReservationResponse> getAllReservations() {
        return repository.findAll().stream()
                .map(mapper::toSimpleReservationResponse)
                .toList();
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

    public ReservationListResponse getAllUserReservations() {
        User currentUser = UserContext.getCurrentUser();
        return repository.findByReservedBy(currentUser).stream()
                .map(mapper::toReservationResponse)
                .collect(ReservationListResponse::new,
                        (list, reservation) -> list.items().add(reservation),
                        (list1, list2) -> list1.items().addAll(list2.items()));
    }
}

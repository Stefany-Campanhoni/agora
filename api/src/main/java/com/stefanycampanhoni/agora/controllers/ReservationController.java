package com.stefanycampanhoni.agora.controllers;

import com.stefanycampanhoni.agora.controllers.dtos.reservation.ReservationListResponse;
import com.stefanycampanhoni.agora.controllers.dtos.reservation.ReservationRequest;
import com.stefanycampanhoni.agora.controllers.dtos.reservation.ReservationResponse;
import com.stefanycampanhoni.agora.controllers.mappers.ReservationMapper;
import com.stefanycampanhoni.agora.models.Reservation;
import com.stefanycampanhoni.agora.models.User;
import com.stefanycampanhoni.agora.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/reservations")
public class ReservationController {

    @Autowired
    private ReservationService service;

    @Autowired
    private ReservationMapper reservationMapper;

    @GetMapping
    public ResponseEntity<ReservationListResponse> getAllReservations() {
        List<Reservation> reservations = service.getAllReservations();
        ReservationListResponse response = reservationMapper.toReservationListResponse(reservations);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ReservationResponse> createReservation(@RequestBody ReservationRequest reservationRequest,
                                                                 @AuthenticationPrincipal User currentUser) {
        Reservation reservation = reservationMapper.toReservation(reservationRequest);
        Reservation createdReservation = service.createReservation(reservation, currentUser);
        ReservationResponse response = reservationMapper.toReservationResponse(createdReservation);
        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/validate")
    public ResponseEntity<Boolean> validateReservation(@RequestBody ReservationRequest reservationRequest) {
        Reservation reservation = reservationMapper.toReservation(reservationRequest);
        boolean isValidReservation = service.isValidReservation(reservation);
        return ResponseEntity.ok(isValidReservation);
    }
}

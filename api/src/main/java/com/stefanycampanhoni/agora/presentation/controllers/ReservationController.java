package com.stefanycampanhoni.agora.presentation.controllers;

import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationListResponse;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationRequest;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationResponse;
import com.stefanycampanhoni.agora.application.dtos.reservation.SimpleReservationResponse;
import com.stefanycampanhoni.agora.application.mappers.ReservationMapper;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.application.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<List<SimpleReservationResponse>> getAllReservations() {
        var reservations = service.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping(path = "/me")
    public ResponseEntity<ReservationListResponse> getUserReservations() {
        ReservationListResponse reservations = service.getAllUserReservations();
        return ResponseEntity.ok(reservations);
    }

    @PostMapping
    public ResponseEntity<ReservationResponse> createReservation(@RequestBody ReservationRequest reservationRequest) {
        var createdReservation = service.createReservation(reservationRequest, reservationRequest.roomId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
    }

    @PostMapping(path = "/validate")
    public ResponseEntity<Boolean> validateReservation(@RequestBody ReservationRequest reservationRequest) {
        boolean isValidReservation = service.isValidReservation(reservationMapper.toReservation(reservationRequest));
        return ResponseEntity.ok(isValidReservation);
    }
}

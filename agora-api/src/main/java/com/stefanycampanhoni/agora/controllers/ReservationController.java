package com.stefanycampanhoni.agora.controllers;

import com.stefanycampanhoni.agora.models.Reservation;
import com.stefanycampanhoni.agora.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/reservations")
public class ReservationController {

    @Autowired
    private ReservationService service;

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = service.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(Reservation reservation) {
        Reservation createdReservation = service.createReservation(reservation);
        return ResponseEntity.ok(createdReservation);
    }

    @PostMapping(path = "/validate")
    public ResponseEntity<Boolean> validateReservation(Reservation reservation) {
        boolean isValidReservation = service.isValidReservation(reservation);
        return ResponseEntity.ok(isValidReservation);
    }
}

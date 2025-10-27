package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.application.dtos.websocket.AdminUpdateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {
    @Autowired
    private UserService userService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ReservationService reservationService;

    public AdminUpdateResponse processUpdate() {
        return new AdminUpdateResponse(
            userService.countUsers(),
            roomService.countRooms(),
            reservationService.countReservations()
        );
    }
}

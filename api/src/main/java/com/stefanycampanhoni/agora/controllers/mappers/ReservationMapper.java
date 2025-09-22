package com.stefanycampanhoni.agora.controllers.mappers;

import com.stefanycampanhoni.agora.controllers.dtos.reservation.ReservationListResponse;
import com.stefanycampanhoni.agora.controllers.dtos.reservation.ReservationRequest;
import com.stefanycampanhoni.agora.controllers.dtos.reservation.ReservationResponse;
import com.stefanycampanhoni.agora.models.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, RoomMapper.class})
public interface ReservationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "reservedBy", ignore = true)
    @Mapping(target = "room", ignore = true)
    Reservation toReservation(ReservationRequest reservationRequest);

    ReservationResponse toReservationResponse(Reservation reservation);

    default ReservationListResponse toReservationListResponse(List<Reservation> reservations) {
        return new ReservationListResponse(
            reservations.stream()
                .map(this::toReservationResponse)
                .toList()
        );
    }
}

package com.stefanycampanhoni.agora.application.mappers;

import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationListResponse;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationRequest;
import com.stefanycampanhoni.agora.application.dtos.reservation.ReservationResponse;
import com.stefanycampanhoni.agora.domain.entities.Reservation;
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

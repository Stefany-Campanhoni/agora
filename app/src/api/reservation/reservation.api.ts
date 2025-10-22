import { apiClient } from "../apiClient"
import type { Reservation, ReservationList, ReservationRequest } from "./reservation.types"

const URI = `/reservations`

export async function getUserReservations(): Promise<ReservationList> {
  const res = await apiClient.get<ReservationList>(`${URI}/me`)
  return res.data
}

export async function reserve(reservation: ReservationRequest): Promise<Reservation> {
  const res = await apiClient.post<Reservation>(URI, reservation)

  if (res.status !== 201) {
    throw new Error("Erro ao criar reserva")
  }

  return res.data
}

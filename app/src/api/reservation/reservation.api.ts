import { apiClient } from ".."
import type { Reservation, ReservationRequest } from "./reservation.types"

const URI = `/reservations`

export async function reserve(reservation: ReservationRequest): Promise<Reservation> {
  const res = await apiClient.post<Reservation>(URI, reservation)

  if (res.status !== 201) {
    throw new Error("Erro ao criar reserva")
  }

  return res.data
}

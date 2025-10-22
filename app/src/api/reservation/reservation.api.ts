import { apiClient } from "../apiClient"
import type { ReservationList } from "./reservation.types"

const URI = `/reservations`

export async function getUserReservations(): Promise<ReservationList> {
  const res = await apiClient.get<ReservationList>(`${URI}/me`)
  return res.data
}

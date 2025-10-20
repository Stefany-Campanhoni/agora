import type { Room } from "../room/room.types"
import type { User } from "../user/user.types"

export type ReservationRequest = {
  roomId: number
  startDateTime: string
  endDateTime: string
}

export type Reservation = {
  id: number
  room: Room
  startDateTime: string
  endDateTime: string
  reservedBy: User
}

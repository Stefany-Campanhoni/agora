import type { Room } from "../room/room.types"
import type { User } from "../user/user.types"

export type Reservation = {
  id: number
  room: Room
  startTime: string
  endTime: string
  reservedBy: User
}

export type ReservationList = {
  items: Reservation[]
}

export type ReservationRequest = {
  roomId: number
  startDateTime: string
  endDateTime: string
}

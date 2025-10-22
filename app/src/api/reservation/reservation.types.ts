import type { RoomResponse } from "../room/room.responses"
import type { UserResponse } from "../user/user.responses"

export type Reservation = {
  id: number
  room: RoomResponse
  startTime: string
  endTime: string
  reservedBy: UserResponse
}

export type ReservationList = {
  items: Reservation[]
}

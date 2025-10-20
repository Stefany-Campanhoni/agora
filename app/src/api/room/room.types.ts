export type Room = {
  id: number
  name: string
  description: string
  capacity: number
  location: string
}

export type RoomList = {
  rooms: Room[]
}

export type RoomRequest = {
  name: string
  description?: string
  capacity: number
  location: string
}

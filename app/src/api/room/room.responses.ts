export type RoomResponse = {
  id: number
  name: string
  description: string
  capacity: number
  location: string
}

export type RoomListResponse = {
  rooms: RoomResponse[]
}

export type RoomRequest = {
  name: string
  description?: string
  capacity: number
  location: string
}

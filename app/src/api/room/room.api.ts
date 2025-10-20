import axios from "axios"
import { API_URL, apiClient } from ".."
import type { Room, RoomList, RoomRequest } from "./room.types"

const URI = `/rooms`

export async function getAllRooms(useApiClient: boolean = true): Promise<RoomList> {
  if (useApiClient) {
    const res = await apiClient.get<RoomList>(URI)
    return res.data
  }

  const res = await axios.get<RoomList>(API_URL + URI)
  return res.data
}

export async function getRoomById(id: number): Promise<Room> {
  const res = await apiClient.get<Room>(`${URI}/${id}`)
  return res.data
}

export async function createRoom(data: RoomRequest): Promise<Room> {
  const res = await apiClient.post<Room>(URI, data)
  return res.data
}

export async function updateRoom(id: number, data: RoomRequest): Promise<Room> {
  const res = await apiClient.put<Room>(`${URI}/${id}`, data)
  return res.data
}

export async function deleteRoom(id: number): Promise<void> {
  const res = await apiClient.delete(`${URI}/${id}`)
  return res.data
}

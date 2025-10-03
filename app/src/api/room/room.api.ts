import axios from "axios"
import { apiClient, API_URL } from ".."
import type {
  RoomListResponse,
  RoomRequest,
  RoomResponse,
} from "./room.responses"

const URI = `/rooms`

export async function getAllRooms(
  useApiClient: boolean = true,
): Promise<RoomListResponse> {
  if (useApiClient) {
    const res = await apiClient.get<RoomListResponse>(URI)
    return res.data
  }

  const res = await axios.get<RoomListResponse>(API_URL + URI)
  return res.data
}

export async function getRoomById(id: number): Promise<RoomResponse> {
  const res = await apiClient.get<RoomResponse>(`${URI}/${id}`)
  return res.data
}

export async function createRoom(data: RoomRequest): Promise<RoomResponse> {
  const res = await apiClient.post<RoomResponse>(URI, data)
  return res.data
}

export async function updateRoom(
  id: number,
  data: RoomRequest,
): Promise<RoomResponse> {
  const res = await apiClient.put<RoomResponse>(`${URI}/${id}`, data)
  return res.data
}

export async function deleteRoom(id: number): Promise<void> {
  const res = await apiClient.delete(`${URI}/${id}`)
  return res.data
}

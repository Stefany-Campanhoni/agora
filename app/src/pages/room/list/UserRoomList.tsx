import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useSelector } from "react-redux"

import type { RootState } from "@/store"
import { RoomCard } from "@/components/room/RoomCard"
import { Alert } from "@/components/alert/Alert"
import { getAllRooms } from "@/service/room/room.api"
import type { Room } from "@/service/room/room.types"

export function UserRoomList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "warning"
  }>({ show: false, message: "", type: "success" })

  const navigate = useNavigate()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const response = await getAllRooms()
      setRooms(response.rooms)
    } catch (error) {
      setAlert({
        show: true,
        message: "Erro ao carregar salas. Tente novamente.",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReserve = (room: Room) => {
    if (!isAuthenticated) {
      setAlert({
        show: true,
        message: "Você precisa estar logado para fazer uma reserva.",
        type: "warning",
      })
      return
    }
    navigate(`/reservations/create/${room.id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Salas Disponíveis</h1>

      {alert.show && (
        <Alert
          type={alert.type}
          onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
        >
          {alert.message}
        </Alert>
      )}

      {rooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma sala disponível no momento.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onReserve={() => handleReserve(room)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

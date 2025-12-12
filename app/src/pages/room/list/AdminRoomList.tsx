import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CustomTable } from "@/components/table/CustomTable"
import { Alert } from "@/components/alert/Alert"
import { getAllRooms, deleteRoom } from "@/service/room/room.api"
import type { Room } from "@/service/room/room.types"

export function AdminRoomList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "warning"
  }>({ show: false, message: "", type: "success" })

  const navigate = useNavigate()

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

  const handleCreate = () => {
    navigate("create")
  }

  const handleEdit = (item: object) => {
    const room = item as Room
    navigate(`edit/${room.id}`)
  }

  const handleDelete = async (item: object) => {
    const room = item as Room
    if (!confirm(`Deseja realmente excluir a sala "${room.name}"?`)) {
      return
    }

    try {
      await deleteRoom(room.id)
      setAlert({
        show: true,
        message: "Sala excluída com sucesso!",
        type: "success",
      })
      fetchRooms()
    } catch (error) {
      setAlert({
        show: true,
        message: "Erro ao excluir sala. Tente novamente.",
        type: "error",
      })
    }
  }

  const tableHeaders = ["Nome", "Descrição", "Localização", "Capacidade"]

  const tableData = rooms.map((room) => ({
    ...room,
    cells: [room.name, room.description, room.location, room.capacity],
  }))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Gerenciamento de Salas</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Criar Nova Sala
        </Button>
      </div>

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
          <p className="text-muted-foreground">
            Nenhuma sala cadastrada. Clique em "Criar Nova Sala" para começar.
          </p>
        </div>
      ) : (
        <CustomTable
          headers={tableHeaders}
          data={tableData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

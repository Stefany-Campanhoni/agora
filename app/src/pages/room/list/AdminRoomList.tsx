import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Alert, type AlertType } from "../../../components/alert/Alert"
import { CustomTable } from "../../../components/table/CustomTable"
import { deleteRoom, getAllRooms } from "../../../service/room/room.api"
import type { Room } from "../../../service/room/room.types"

export function AdminRoomList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const navigate = useNavigate()
  const tableHeaders = ["Nome", "Descrição", "Localização", "Capacidade"]
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null)

  function onEdit(item: object) {
    const room = item as Room
    navigate(`edit/${room.id}`)
  }

  async function onDelete(item: object) {
    const room = item as Room
    if (window.confirm(`Tem certeza que deseja excluir a sala "${room.name}"?`)) {
      try {
        await deleteRoom(room.id)
        setAlert({ message: "Sala excluída com sucesso!", type: "success" })
        await loadRooms()
      } catch (error) {
        console.error("Erro ao excluir sala:", error)
        setAlert({ message: "Erro ao excluir sala.", type: "error" })
      }
    }
  }

  const loadRooms = async () => {
    try {
      const response = await getAllRooms(false)
      setRooms(response.rooms)
    } catch (error) {
      console.error("Erro ao carregar salas:", error)
      setAlert({ message: "Erro ao carregar salas.", type: "error" })
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  return (
    <>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div style={{ marginBottom: "1rem", textAlign: "right" }}>
        <button
          className="admin-logout-btn"
          onClick={() => navigate("create")}
          style={{ width: "auto", display: "inline-flex" }}
        >
          <span>Criar Nova Sala</span>
        </button>
      </div>
      <CustomTable
        data={rooms}
        dataHeader={tableHeaders}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  )
}

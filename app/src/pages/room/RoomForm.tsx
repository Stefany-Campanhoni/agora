import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createRoom, getRoomById, updateRoom } from "../../api/room/room.api"
import type { RoomRequest, RoomResponse } from "../../api/room/room.responses"
import { RoomForm as RoomFormComponent } from "../../components/form/room/RoomForm"

export function RoomForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [initialData, setInitialData] = useState<Partial<RoomResponse>>({})
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (id) {
      setIsEditMode(true)
      loadRoom(parseInt(id, 10))
    } else {
      setIsEditMode(false)
      setInitialData({})
      setIsLoading(false)
    }
  }, [id])

  const loadRoom = async (roomId: number) => {
    try {
      setIsLoading(true)
      const room = await getRoomById(roomId)
      setInitialData(room)
    } catch (error) {
      console.error("Erro ao carregar sala:", error)
      alert("Erro ao carregar dados da sala")
      navigate("/rooms")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: RoomRequest) => {
    try {
      setIsLoading(true)

      if (isEditMode && id) {
        await updateRoom(parseInt(id, 10), data)
        alert("Sala atualizada com sucesso!")
      } else {
        await createRoom(data)
        alert("Sala criada com sucesso!")
      }

      navigate("/rooms")
    } catch (error) {
      console.error("Erro ao salvar sala:", error)
      alert("Erro ao salvar sala. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RoomFormComponent
      onSubmit={handleSubmit}
      isLoading={isLoading}
      initialData={initialData}
      mode={isEditMode ? "edit" : "create"}
    />
  )
}

import { useParams } from "react-router-dom"

export function ReservateRoomForm() {
  const { id } = useParams<{ id: string }>()

  return <h2>Reserva da sala {id}</h2>
}

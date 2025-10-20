import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { reserve } from "../../../api/reservation/reservation.api"
import type { ReservationRequest } from "../../../api/reservation/reservation.types"
import { getRoomById } from "../../../api/room/room.api"
import type { Room } from "../../../api/room/room.types"
import { BaseForm } from "../../../components/form/BaseForm"
import { FormInput } from "../../../components/form/inputs/FormInput"
import "./ReservationForm.css"

export type ReservationFormData = {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export function ReserveRoomForm() {
  const [room, setRoom] = useState<Room>(null!)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>({
    defaultValues: {
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    },
  })

  useEffect(() => {
    if (!id) navigate(-1)
    ;(async () => {
      try {
        const roomData = await getRoomById(parseInt(id!, 10))
        setRoom(roomData)
      } catch (error) {
        navigate(-1)
      }
    })()
  }, [id])

  async function submitReservation(reservationFormData: ReservationFormData) {
    const startDateTime = new Date(
      `${reservationFormData.startDate}T${reservationFormData.startTime}`,
    )
    const endDateTime = new Date(`${reservationFormData.endDate}T${reservationFormData.endTime}`)
    const reservationData: ReservationRequest = {
      roomId: room.id,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
    }

    try {
      await reserve(reservationData)
    } catch (error) {
      console.error("Erro ao reservar sala:", error)
    }
  }

  return (
    <>
      {room ? (
        <BaseForm
          title={`Reserve a sala ${room.name}!`}
          onSubmit={handleSubmit(submitReservation)}
          submitText="Reservar!"
          showBackButton
        >
          <div className="room-info-card">
            <h3>Informações da Sala</h3>
            <div className="room-details">
              <div className="room-detail-item">
                <span className="detail-label">Descrição:</span>
                <span className="detail-value">{room.description}</span>
              </div>
              <div className="room-detail-item">
                <span className="detail-label">Capacidade:</span>
                <span className="detail-value">{room.capacity} pessoas</span>
              </div>
              <div className="room-detail-item">
                <span className="detail-label">Localização:</span>
                <span className="detail-value">{room.location}</span>
              </div>
            </div>
          </div>

          <div className="reservation-section">
            <h3>Período de Reserva</h3>
            <div className="datetime-group">
              <div className="datetime-row">
                <FormInput
                  label="Data de Início"
                  type="date"
                  register={register("startDate", { required: "Data de início é obrigatória" })}
                  error={errors.startDate}
                />
                <FormInput
                  label="Hora de Início"
                  type="time"
                  register={register("startTime", { required: "Hora de início é obrigatória" })}
                  error={errors.startTime}
                />
              </div>

              <div className="datetime-row">
                <FormInput
                  label="Data de Término"
                  type="date"
                  register={register("endDate", { required: "Data de término é obrigatória" })}
                  error={errors.endDate}
                />
                <FormInput
                  label="Hora de Término"
                  type="time"
                  register={register("endTime", { required: "Hora de término é obrigatória" })}
                  error={errors.endTime}
                />
              </div>
            </div>
          </div>
        </BaseForm>
      ) : (
        <div className="loading-container">
          <p>Carregando dados da sala...</p>
        </div>
      )}
    </>
  )
}

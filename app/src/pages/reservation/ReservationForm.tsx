import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { Room } from "../../api/room/room.types"
import { getRoomById } from "../../api/room/room.api"
import { reserve } from "../../api/reservation/reservation.api"
import type { ReservationRequest } from "../../api/reservation/reservation.types"
import { BaseForm } from "../../components/form/BaseForm"
import { FormInput } from "../../components/form/inputs/FormInput"
import "./ReservationForm.css"
import { DatePicker } from "../../components/pickers/DatePicker"

export type ReservationFormData = {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export function ReserveRoomForm() {
  const [room, setRoom] = useState<Room>(null!)
  const [disabledDates, setDisabledDates] = useState<string[]>([])
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
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

  // Busca datas indisponíveis (mockadas por enquanto)
  useEffect(() => {
    // TODO: Substituir por chamada real ao endpoint
    // const fetchDisabledDates = async () => {
    //   const response = await fetch(`/api/rooms/${id}/unavailable-dates`)
    //   const data = await response.json()
    //   setDisabledDates(data.dates)
    // }
    // fetchDisabledDates()

    // Dados mockados: datas indisponíveis
    const today = new Date()
    const mockedDisabledDates: string[] = []

    // Adiciona algumas datas específicas como indisponíveis
    for (let i = 2; i <= 20; i += 3) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      mockedDisabledDates.push(date.toISOString().split("T")[0])
    }

    // Adiciona 25 de outubro como exemplo
    mockedDisabledDates.push("2025-10-25")

    setDisabledDates(mockedDisabledDates)
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
                <DatePicker
                  label="Data de Início"
                  name="startDate"
                  control={control}
                  error={errors.startDate}
                  disabledDates={disabledDates}
                  minDate={new Date()}
                  required
                  placeholder="Selecione a data de início"
                />
                <FormInput
                  label="Hora de Início"
                  type="time"
                  register={register("startTime", { required: "Hora de início é obrigatória" })}
                  error={errors.startTime}
                />
              </div>

              <div className="datetime-row">
                <DatePicker
                  label="Data de Término"
                  name="endDate"
                  control={control}
                  error={errors.endDate}
                  disabledDates={disabledDates}
                  minDate={
                    watch("startDate")
                      ? new Date(new Date(watch("startDate")).getTime() + 24 * 60 * 60 * 1000)
                      : new Date()
                  }
                  required
                  placeholder="Selecione a data de término"
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

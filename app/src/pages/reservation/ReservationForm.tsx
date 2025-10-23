import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { BaseForm } from "../../components/form/BaseForm"
import { DatePicker } from "../../components/pickers/DatePicker"
import { TimePicker } from "../../components/pickers/TimePicker"
import { getAllReservations, reserve } from "../../service/reservation/reservation.api"
import {
  CLOSING_TIME,
  getDisabledDates,
  getDisabledTimes,
  OPENING_TIME,
} from "../../service/reservation/reservation.service"
import type { ReservationRequest } from "../../service/reservation/reservation.types"
import { getRoomById } from "../../service/room/room.api"
import type { Room } from "../../service/room/room.types"
import "./ReservationForm.css"

export type ReservationFormData = {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export function ReserveRoomForm() {
  const [room, setRoom] = useState<Room>(null!)
  const [disabledDates, setDisabledDates] = useState<string[]>([])
  const [disabledTimes, setDisabledTimes] = useState<string[]>([])

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const {
    control,
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
    if (!id) {
      navigate(-1)
    }

    ;(async () => {
      try {
        const roomData = await getRoomById(parseInt(id!, 10))
        setRoom(roomData)

        const allReservations = await getAllReservations()
        const disabledDatesData = getDisabledDates(allReservations)
        const disabledTimesData = getDisabledTimes(allReservations)
        setDisabledDates(disabledDatesData)
        setDisabledTimes(disabledTimesData)
      } catch (error) {
        console.error("Erro ao carregar dados da sala:", error)
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
                <TimePicker
                  label="Hora de Início"
                  name="startTime"
                  control={control}
                  error={errors.startTime}
                  disabledTimes={disabledTimes}
                  minTime={new Date(`1970-01-01T${OPENING_TIME}`)}
                  maxTime={new Date(`1970-01-01T${CLOSING_TIME}`)}
                  required
                  placeholder="Selecione a hora de início"
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
                <TimePicker
                  label="Hora de Término"
                  name="endTime"
                  control={control}
                  error={errors.endTime}
                  disabledTimes={disabledTimes}
                  minTime={new Date(`1970-01-01T${OPENING_TIME}`)}
                  maxTime={new Date(`1970-01-01T${CLOSING_TIME}`)}
                  required
                  placeholder="Selecione a hora de término"
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

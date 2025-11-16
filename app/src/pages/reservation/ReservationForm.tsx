import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { Alert } from "../../components/alert/Alert"
import { BaseForm } from "../../components/form/BaseForm"
import { DatePicker } from "../../components/pickers/DatePicker"
import { TimePicker } from "../../components/pickers/TimePicker"
import { reserve } from "../../service/reservation/reservation.api"
import {
  CLOSING_TIME,
  getAllReservationsDateTime,
  getDisabledDates,
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
  const [displayError, setDisplayError] = useState<boolean>(false)
  const [displayStartDisabledTimesHint, setDisplayStartDisabledTimesHint] = useState<boolean>(false)
  const [displayEndDisabledTimesHint, setDisplayEndDisabledTimesHint] = useState<boolean>(false)
  const [disabledDates, setDisabledDates] = useState<string[]>([])
  const [disabledTimes, setDisabledTimes] = useState<string[]>([])
  const [reservationsMap, setReservationsMap] = useState<Map<string, string[]>>(
    new Map<string, string[]>(),
  )

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
  const watchStartDate = watch("startDate")
  const watchEndDate = watch("endDate")

  useEffect(() => {
    console.log("startDate", watchStartDate)
  }, [watchStartDate])

  useEffect(() => {
    if (!id) {
      navigate(-1)
    }

    ;(async () => {
      try {
        const roomData = await getRoomById(parseInt(id!, 10))
        setRoom(roomData)

        const { allStartDateTime, allEndDateTime } = await getAllReservationsDateTime()
        const disabledDates = getDisabledDates(allStartDateTime, allEndDateTime)

        const allDateTimes = new Map<string, string[]>()
        for (const [key, starts] of allStartDateTime.entries()) {
          allDateTimes.set(key, [...(allDateTimes.get(key) ?? []), ...starts])
        }
        for (const [key, ends] of allEndDateTime.entries()) {
          allDateTimes.set(key, [...(allDateTimes.get(key) ?? []), ...ends])
        }

        setReservationsMap(allDateTimes)
        setDisabledDates(disabledDates)
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
      setDisplayError(true)
    }
  }

  return (
    <>
      {displayError && (
        <Alert
          type="error"
          onClose={() => setDisplayError(false)}
        >
          Não foi possível efetuar a reserva — o horário informado é inválido ou conflita com uma
          reserva existente.
        </Alert>
      )}
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
                  onChange={(date) => {
                    setDisplayStartDisabledTimesHint(true)
                    setDisabledTimes(reservationsMap.get(date) || [])
                  }}
                />
                <TimePicker
                  label="Hora de Início"
                  name="startTime"
                  control={control}
                  error={errors.startTime}
                  displayDisabledHint={displayStartDisabledTimesHint}
                  disabledTimes={disabledTimes}
                  minTime={new Date(`1970-01-01T${OPENING_TIME}`)}
                  maxTime={new Date(`1970-01-01T${CLOSING_TIME}`)}
                  required
                  placeholder="Selecione a hora de início"
                  onChange={() => {
                    setDisplayStartDisabledTimesHint(false)
                  }}
                />
              </div>

              <div className="datetime-row">
                <DatePicker
                  label="Data de Término"
                  name="endDate"
                  control={control}
                  error={errors.endDate}
                  disabledDates={disabledDates}
                  minDate={watchStartDate ? new Date(watchStartDate + "T00:00:00") : new Date()}
                  required
                  placeholder="Selecione a data de término"
                  onChange={(date) => {
                    setDisplayEndDisabledTimesHint(true)
                    setDisabledTimes(reservationsMap.get(date) || [])
                  }}
                />
                <TimePicker
                  label="Hora de Término"
                  name="endTime"
                  control={control}
                  error={errors.endTime}
                  displayDisabledHint={displayEndDisabledTimesHint}
                  disabledTimes={disabledTimes}
                  minTime={
                    watchEndDate === watchStartDate && watch("startTime")
                      ? new Date(`1970-01-01T${watch("startTime")}`)
                      : new Date(`1970-01-01T${OPENING_TIME}`)
                  }
                  maxTime={new Date(`1970-01-01T${CLOSING_TIME}`)}
                  required
                  placeholder="Selecione a hora de término"
                  onChange={() => {
                    setDisplayEndDisabledTimesHint(false)
                  }}
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

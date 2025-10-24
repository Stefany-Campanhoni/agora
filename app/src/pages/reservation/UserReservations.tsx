import { useEffect, useState } from "react"
import { Badge, Card, Container } from "react-bootstrap"
import { getUserReservations } from "../../service/reservation/reservation.api"
import type { Reservation, ReservationList } from "../../service/reservation/reservation.types"
import "./UserReservations.css"

enum Status {
  UPCOMING = "Próxima",
  DONE = "Concluída",
  IN_PROGRESS = "Em Andamento",
}

export function UserReservations() {
  const [userReservations, setUserReservations] = useState<ReservationList | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const userReservations = await getUserReservations()
        setUserReservations(userReservations)
      } catch (error) {
        console.error("Erro ao carregar reservas:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      shortDate: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      time: date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDateTime:
        date.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
        " às " +
        date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    }
  }

  const isUpcoming = (reservation: Reservation): Status => {
    const reservationStart = new Date(reservation.startDateTime)
    const reservationEnd = new Date(reservation.endDateTime)
    const now = new Date()

    if (now < reservationStart) {
      return Status.UPCOMING
    }

    if (now > reservationEnd) {
      return Status.DONE
    }

    return Status.IN_PROGRESS
  }

  const isSameDay = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return (
      startDate.getDate() === endDate.getDate() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    )
  }

  if (loading) {
    return (
      <Container className="user-reservations-container">
        <div className="reservations-loading">
          <p>Carregando suas reservas...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="user-reservations-container">
      <div className="reservations-header">
        <h2>Minhas Reservas</h2>
        <p className="reservations-subtitle">Gerencie e visualize todas as suas reservas</p>
      </div>

      {userReservations && userReservations.items.length > 0 ? (
        <div className="reservations-grid">
          {userReservations.items.map((reservation) => {
            const start = formatDateTime(reservation.startDateTime)
            const end = formatDateTime(reservation.endDateTime)
            const upcoming = isUpcoming(reservation)
            const sameDay = isSameDay(reservation.startDateTime, reservation.endDateTime)

            return (
              <Card
                key={reservation.id}
                className="reservation-card"
              >
                <Card.Body>
                  <div className="reservation-card-header">
                    <div className="reservation-card-title">
                      <h5 className="reservation-room-name">{reservation.room.name}</h5>
                      {reservation.room.description && (
                        <p className="reservation-description">{reservation.room.description}</p>
                      )}
                    </div>
                    <Badge
                      bg={upcoming === Status.UPCOMING ? "success" : "secondary"}
                      className="reservation-card-badge"
                    >
                      {upcoming}
                    </Badge>
                  </div>

                  <div className="reservation-ticket">
                    <div className="ticket-route">
                      <div className="ticket-time-block">
                        <div className="ticket-time">{start.time}</div>
                        <div className="ticket-date">{start.shortDate}</div>
                        {!sameDay && (
                          <div className="ticket-year">
                            {new Date(reservation.startDateTime).getFullYear()}
                          </div>
                        )}
                      </div>

                      <div className="ticket-connector">
                        <div className="connector-arrow">
                          <svg
                            width="40"
                            height="20"
                            viewBox="0 0 60 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 10H58M58 10L50 2M58 10L50 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="ticket-time-block">
                        <div className="ticket-time">{end.time}</div>
                        <div className="ticket-date">{end.shortDate}</div>
                        {!sameDay && (
                          <div className="ticket-year">
                            {new Date(reservation.endDateTime).getFullYear()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ticket-divider"></div>

                    <div className="ticket-info">
                      <div className="ticket-info-item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1S16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        <div>
                          <div className="ticket-label">Localização</div>
                          <div className="ticket-value">{reservation.room.location}</div>
                        </div>
                      </div>

                      <div className="ticket-info-item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="9"
                            cy="7"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div>
                          <div className="ticket-label">Capacidade</div>
                          <div className="ticket-value">
                            {reservation.room.capacity}{" "}
                            {reservation.room.capacity === 1 ? "pessoa" : "pessoas"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="reservations-empty">
          <div className="empty-icon">📅</div>
          <h4>Nenhuma reserva encontrada</h4>
          <p>
            Você ainda não possui reservas. Explore as salas disponíveis e faça sua primeira
            reserva!
          </p>
        </div>
      )}
    </Container>
  )
}

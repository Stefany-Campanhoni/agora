import { useEffect, useState } from "react"
import { Loader2, MapPin, Users, ArrowRight, CalendarDays } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUserReservations } from "@/service/reservation/reservation.api"
import type { Reservation, ReservationList } from "@/service/reservation/reservation.types"

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

  const getStatus = (reservation: Reservation): Status => {
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

  const getStatusVariant = (
    status: Status,
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case Status.UPCOMING:
        return "default"
      case Status.IN_PROGRESS:
        return "secondary"
      case Status.DONE:
        return "outline"
      default:
        return "default"
    }
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Minhas Reservas</h1>
        <p className="text-muted-foreground mt-1">Gerencie e visualize todas as suas reservas</p>
      </div>

      {userReservations && userReservations.items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userReservations.items.map((reservation) => {
            const start = formatDateTime(reservation.startDateTime)
            const end = formatDateTime(reservation.endDateTime)
            const status = getStatus(reservation)
            const sameDay = isSameDay(reservation.startDateTime, reservation.endDateTime)

            return (
              <Card
                key={reservation.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {reservation.room.name}
                        </h3>
                        {reservation.room.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {reservation.room.description}
                          </p>
                        )}
                      </div>
                      <Badge variant={getStatusVariant(status)}>{status}</Badge>
                    </div>
                  </div>

                  {/* Time Route */}
                  <div className="p-4 bg-muted/30">
                    <div className="flex items-center justify-between gap-4">
                      {/* Start Time */}
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{start.time}</div>
                        <div className="text-sm text-muted-foreground">{start.shortDate}</div>
                        {!sameDay && (
                          <div className="text-xs text-muted-foreground">
                            {new Date(reservation.startDateTime).getFullYear()}
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <div className="flex-1 flex justify-center">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>

                      {/* End Time */}
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{end.time}</div>
                        <div className="text-sm text-muted-foreground">{end.shortDate}</div>
                        {!sameDay && (
                          <div className="text-xs text-muted-foreground">
                            {new Date(reservation.endDateTime).getFullYear()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Localização:</span>
                      <span className="text-foreground">{reservation.room.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Capacidade:</span>
                      <span className="text-foreground">
                        {reservation.room.capacity}{" "}
                        {reservation.room.capacity === 1 ? "pessoa" : "pessoas"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CalendarDays className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground">Nenhuma reserva encontrada</h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Você ainda não possui reservas. Explore as salas disponíveis e faça sua primeira
            reserva!
          </p>
        </div>
      )}
    </div>
  )
}

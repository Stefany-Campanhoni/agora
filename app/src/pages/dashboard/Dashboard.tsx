import { useEffect, useState } from "react"
import { Users, Building, CalendarDays, Loader2 } from "lucide-react"
import { useWebsocket } from "@/components/websocket/WebsocketContext"
import { publishUpdateMessage } from "@/service/websocket/websocket"
import type { AdminDashboardUpdateMessage } from "@/service/websocket/websocket.types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Dashboard() {
  const [updates, setUpdates] = useState<AdminDashboardUpdateMessage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { connectionState, subscribe, unsubscribe } = useWebsocket()

  useEffect(() => {
    if (connectionState === "CONNECTED") {
      const subscriptionId = subscribe("/admin/dashboard", (message) => {
        console.log("Received admin update:", message.body)
        const update: AdminDashboardUpdateMessage = JSON.parse(message.body)
        setUpdates(update)
        setIsLoading(false)
      })

      publishUpdateMessage()

      return () => {
        if (subscriptionId) {
          unsubscribe(subscriptionId)
        }
      }
    }
  }, [connectionState, subscribe, unsubscribe])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="sr-only">Carregando...</span>
      </div>
    )
  }

  if (!updates) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Nenhum dado disponível no momento</p>
      </div>
    )
  }

  const maxValue = Math.max(
    updates.userQuantity,
    updates.roomQuantity,
    updates.reservationQuantity,
    100,
  )

  const total = updates.userQuantity + updates.roomQuantity + updates.reservationQuantity

  const stats = [
    {
      label: "Usuários",
      value: updates.userQuantity,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      progress: (updates.userQuantity / maxValue) * 100,
    },
    {
      label: "Salas",
      value: updates.roomQuantity,
      icon: Building,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      progress: (updates.roomQuantity / maxValue) * 100,
    },
    {
      label: "Reservas",
      value: updates.reservationQuantity,
      icon: CalendarDays,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      progress: (updates.reservationQuantity / maxValue) * 100,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
              <div className="mt-4">
                <Progress
                  value={stat.progress}
                  className="h-2"
                />
                <p className="mt-1 text-xs text-muted-foreground text-right">
                  {Math.round(stat.progress)}%
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estatísticas do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between"
              >
                <span className="text-muted-foreground">Total de {stat.label}:</span>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição de Recursos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.map((stat) => {
              const percentage = total > 0 ? (stat.value / total) * 100 : 0
              return (
                <div
                  key={stat.label}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>{stat.label}</span>
                    <span className="font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2"
                  />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

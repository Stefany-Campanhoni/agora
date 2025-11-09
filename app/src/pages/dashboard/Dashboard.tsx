import { useEffect, useState } from "react"
import { Card, ProgressBar, Spinner } from "react-bootstrap"
import { FaUsers, FaCalendarAlt, FaBuilding } from "react-icons/fa"
import { useWebsocket } from "../../components/websocket/WebsocketContext"
import { publishUpdateMessage } from "../../service/websocket/websocket"
import type { AdminDashboardUpdateMessage } from "../../service/websocket/websocket.types"
import "./Dashboard.css"

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
      <div className="dashboard-loading">
        <Spinner
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    )
  }

  if (!updates) {
    return (
      <div className="dashboard-error">
        <p>Nenhum dado disponível no momento</p>
      </div>
    )
  }

  const maxValue = Math.max(
    updates.userQuantity,
    updates.roomQuantity,
    updates.reservationQuantity,
    100,
  )

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Users Card */}
        <div className="dashboard-col">
          <Card className="dashboard-card">
            <Card.Body className="dashboard-card-body">
              <div className="dashboard-card-header">
                <div className="dashboard-card-icon users-icon">
                  <FaUsers />
                </div>
                <div className="dashboard-card-title-group">
                  <p className="dashboard-card-label">Usuários</p>
                  <h3 className="dashboard-card-value">{updates.userQuantity}</h3>
                </div>
              </div>
              <div className="dashboard-card-progress">
                <ProgressBar
                  now={(updates.userQuantity / maxValue) * 100}
                  className="users-progress"
                  label={`${Math.round((updates.userQuantity / maxValue) * 100)}%`}
                />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Rooms Card */}
        <div className="dashboard-col">
          <Card className="dashboard-card">
            <Card.Body className="dashboard-card-body">
              <div className="dashboard-card-header">
                <div className="dashboard-card-icon rooms-icon">
                  <FaBuilding />
                </div>
                <div className="dashboard-card-title-group">
                  <p className="dashboard-card-label">Salas</p>
                  <h3 className="dashboard-card-value">{updates.roomQuantity}</h3>
                </div>
              </div>
              <div className="dashboard-card-progress">
                <ProgressBar
                  now={(updates.roomQuantity / maxValue) * 100}
                  className="rooms-progress"
                  label={`${Math.round((updates.roomQuantity / maxValue) * 100)}%`}
                />
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Reservations Card */}
        <div className="dashboard-col">
          <Card className="dashboard-card">
            <Card.Body className="dashboard-card-body">
              <div className="dashboard-card-header">
                <div className="dashboard-card-icon reservations-icon">
                  <FaCalendarAlt />
                </div>
                <div className="dashboard-card-title-group">
                  <p className="dashboard-card-label">Reservas</p>
                  <h3 className="dashboard-card-value">{updates.reservationQuantity}</h3>
                </div>
              </div>
              <div className="dashboard-card-progress">
                <ProgressBar
                  now={(updates.reservationQuantity / maxValue) * 100}
                  className="reservations-progress"
                  label={`${Math.round((updates.reservationQuantity / maxValue) * 100)}%`}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Summary Section */}
      <div className="dashboard-summary">
        <div className="dashboard-summary-col">
          <Card className="dashboard-summary-card">
            <Card.Body>
              <h5 className="summary-title">Estatísticas do Sistema</h5>
              <div className="summary-stats">
                <div className="summary-stat-item">
                  <span className="summary-stat-label">Total de Usuários:</span>
                  <span className="summary-stat-value">{updates.userQuantity}</span>
                </div>
                <div className="summary-stat-item">
                  <span className="summary-stat-label">Total de Salas:</span>
                  <span className="summary-stat-value">{updates.roomQuantity}</span>
                </div>
                <div className="summary-stat-item">
                  <span className="summary-stat-label">Total de Reservas:</span>
                  <span className="summary-stat-value">{updates.reservationQuantity}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="dashboard-summary-col">
          <Card className="dashboard-summary-card">
            <Card.Body>
              <h5 className="summary-title">Distribuição de Recursos</h5>
              <div className="distribution-chart">
                <div className="distribution-item">
                  <div className="distribution-label">
                    <span>Usuários</span>
                    <span className="distribution-percentage">
                      {maxValue > 0
                        ? (
                            (updates.userQuantity /
                              (updates.userQuantity +
                                updates.roomQuantity +
                                updates.reservationQuantity)) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <ProgressBar
                    now={
                      maxValue > 0
                        ? (updates.userQuantity /
                            (updates.userQuantity +
                              updates.roomQuantity +
                              updates.reservationQuantity)) *
                          100
                        : 0
                    }
                    className="users-progress"
                  />
                </div>
                <div className="distribution-item">
                  <div className="distribution-label">
                    <span>Salas</span>
                    <span className="distribution-percentage">
                      {maxValue > 0
                        ? (
                            (updates.roomQuantity /
                              (updates.userQuantity +
                                updates.roomQuantity +
                                updates.reservationQuantity)) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <ProgressBar
                    now={
                      maxValue > 0
                        ? (updates.roomQuantity /
                            (updates.userQuantity +
                              updates.roomQuantity +
                              updates.reservationQuantity)) *
                          100
                        : 0
                    }
                    className="rooms-progress"
                  />
                </div>
                <div className="distribution-item">
                  <div className="distribution-label">
                    <span>Reservas</span>
                    <span className="distribution-percentage">
                      {maxValue > 0
                        ? (
                            (updates.reservationQuantity /
                              (updates.userQuantity +
                                updates.roomQuantity +
                                updates.reservationQuantity)) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <ProgressBar
                    now={
                      maxValue > 0
                        ? (updates.reservationQuantity /
                            (updates.userQuantity +
                              updates.roomQuantity +
                              updates.reservationQuantity)) *
                          100
                        : 0
                    }
                    className="reservations-progress"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

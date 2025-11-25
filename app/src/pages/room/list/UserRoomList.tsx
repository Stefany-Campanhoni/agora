import { useEffect, useState } from "react"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Alert, type AlertType } from "../../../components/alert/Alert"
import { RoomCard } from "../../../components/room/RoomCard"
import { useAuth } from "../../../hooks/useAuth"
import { getAllRooms } from "../../../service/room/room.api"
import type { Room } from "../../../service/room/room.types"
import "./RoomList.css"

export function UserRoomList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [displayWarning, setDisplayWarning] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      setIsLoading(true)
      const response = await getAllRooms(false)
      setRooms(response.rooms)
    } catch (error) {
      console.error("Erro ao carregar salas:", error)
      setAlert({ message: "Erro ao carregar salas.", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Container className="rooms-container d-flex justify-content-center align-items-center">
        <Spinner
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </Container>
    )
  }

  const handleReserve = (roomId: number) => {
    if (!isAuthenticated) {
      setDisplayWarning(true)
      return
    }

    navigate(`${roomId}/reserve`)
  }

  return (
    <Container className="rooms-container">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {displayWarning && (
        <Alert
          type="warning"
          onClose={() => setDisplayWarning(false)}
        >
          Você precisa estar logado para reservar uma sala.
          <br />
          Clique aqui para <a href="/user/login">fazer login</a>.
        </Alert>
      )}

      <Row className="rooms-grid g-4 justify-content-center">
        {rooms.map((room) => (
          <Col
            key={room.id}
            md={6}
            lg={4}
            className="d-flex"
          >
            <RoomCard
              room={room}
              onReserve={handleReserve}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

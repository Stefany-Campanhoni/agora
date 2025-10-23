import { useEffect, useState } from "react"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { RoomCard } from "../../../components/room/RoomCard"
import { getAllRooms } from "../../../service/room/room.api"
import type { Room } from "../../../service/room/room.types"
import "./RoomList.css"

export function UserRoomList() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

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
      alert("Erro ao carregar salas.")
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
    navigate(`${roomId}/reserve`)
  }

  return (
    <Container className="rooms-container">
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

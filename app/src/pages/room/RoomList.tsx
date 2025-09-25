import { useEffect, useState } from "react"
import { Badge, Button, Card, Col, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { deleteRoom, getAllRooms } from "../../api/room/room.api"
import type { RoomResponse } from "../../api/room/room.responses"

export function RoomList() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<RoomResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      setIsLoading(true)
      const response = await getAllRooms()
      setRooms(response.rooms)
    } catch (error) {
      console.error("Erro ao carregar salas:", error)
      alert("Erro ao carregar salas.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (id: number) => {
    navigate(`/rooms/edit/${id}`)
  }

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a sala "${name}"?`)) {
      try {
        setDeletingId(id)
        await deleteRoom(id)
        alert("Sala excluída com sucesso!")
        await loadRooms()
      } catch (error) {
        console.error("Erro ao excluir sala:", error)
        alert("Erro ao excluir sala.")
      } finally {
        setDeletingId(null)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <Spinner
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Row>
        {rooms.map((room) => (
          <Col
            key={room.id}
            md={6}
            lg={4}
            className="mb-4"
          >
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <div className="flex-grow-1">
                  <Card.Title className="d-flex justify-content-between align-items-start">
                    <span>{room.name}</span>
                    <Badge
                      bg="secondary"
                      className="ms-2"
                    >
                      {room.capacity} {room.capacity === 1 ? "pessoa" : "pessoas"}
                    </Badge>
                  </Card.Title>

                  {room.description && (
                    <Card.Text className="text-muted">{room.description}</Card.Text>
                  )}

                  <div className="mb-3">
                    <small className="text-muted">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-1"
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
                      {room.location}
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(room.id)}
                    className="flex-fill"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(room.id, room.name)}
                    disabled={deletingId === room.id}
                    className="flex-fill"
                  >
                    {deletingId === room.id ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                      />
                    ) : (
                      "Excluir"
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

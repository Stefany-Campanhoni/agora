import { Badge, Button, Card } from "react-bootstrap"
import type { Room } from "../../api/room/room.types"
import "./RoomCard.css"

interface RoomCardProps {
  room: Room
  onReserve?: (room: number) => void
}

export function RoomCard({ room, onReserve }: RoomCardProps) {
  return (
    <Card className="room-card flex-grow-1 h-100">
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

          {room.description && <Card.Text className="text-muted">{room.description}</Card.Text>}

          <div className="mb-3">
            <small className="text-muted room-location">
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
            onClick={() => onReserve?.(room.id)}
            className="flex-fill"
          >
            Reservar
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

import { MapPin, Users } from "lucide-react"
import type { Room } from "@/service/room/room.types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RoomCardProps {
  room: Room
  onReserve?: (room: number) => void
}

export function RoomCard({ room, onReserve }: RoomCardProps) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{room.name}</CardTitle>
          <Badge
            variant="secondary"
            className="shrink-0"
          >
            <Users className="mr-1 h-3 w-3" />
            {room.capacity} {room.capacity === 1 ? "pessoa" : "pessoas"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        {room.description && <CardDescription>{room.description}</CardDescription>}
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1.5 h-4 w-4" />
          {room.location}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="outline"
          onClick={() => onReserve?.(room.id)}
          className="w-full"
        >
          Reservar
        </Button>
      </CardFooter>
    </Card>
  )
}

import { useEffect, useState } from "react"
import { useWebsocket } from "../../components/websocket/WebsocketContext"
import { publishUpdateMessage } from "../../service/websocket/websocket"
import type { AdminDashboardUpdateMessage } from "../../service/websocket/websocket.types"

export function Dashboard() {
  const [updates, setUpdates] = useState<AdminDashboardUpdateMessage | null>(null)
  const { connectionState, subscribe, unsubscribe } = useWebsocket()

  useEffect(() => {
    if (connectionState === "CONNECTED") {
      const subscriptionId = subscribe("/admin/dashboard", (message) => {
        console.log("Received admin update:", message.body)
        const update: AdminDashboardUpdateMessage = JSON.parse(message.body)
        setUpdates(update)
      })

      publishUpdateMessage()

      return () => {
        if (subscriptionId) {
          unsubscribe(subscriptionId)
        }
      }
    }
  }, [connectionState, subscribe, unsubscribe])

  return <div>{JSON.stringify(updates)}</div>
}

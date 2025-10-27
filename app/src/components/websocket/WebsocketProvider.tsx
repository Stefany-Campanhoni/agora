import type { Client, IMessage, StompSubscription } from "@stomp/stompjs"
import { useEffect, useRef, useState } from "react"
import { createWebsocketClient, setGlobalWebsocketClient } from "../../service/websocket/websocket"
import { ConnectionStateEnum, type ConnectionState } from "../../service/websocket/websocket.types"
import { WebsocketContext } from "./WebsocketContext"

export function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const [wsClient, setWsClient] = useState<Client | null>(null)
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionStateEnum.DISCONNECTED,
  )
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map())

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const wsClient = createWebsocketClient()
    wsClient.configure({
      onConnect: () => {
        console.log("WebSocket connected")
        setConnectionState(ConnectionStateEnum.CONNECTED)
        setGlobalWebsocketClient(wsClient)
      },
      onStompError: (frame) => {
        console.error("WebSocket error:", frame.headers["message"], frame.body)
        setConnectionState(ConnectionStateEnum.ERROR)
        setGlobalWebsocketClient(null)
      },
      onDisconnect: () => {
        console.log("WebSocket disconnected")
        setConnectionState(ConnectionStateEnum.DISCONNECTED)
        setGlobalWebsocketClient(null)
      },
    })

    wsClient.activate()
    setConnectionState(ConnectionStateEnum.CONNECTING)
    setWsClient(wsClient)

    return () => {
      wsClient.deactivate()
      setConnectionState(ConnectionStateEnum.DISCONNECTED)
      subscriptionsRef.current.clear()
      setGlobalWebsocketClient(null)
    }
  }, [])

  function subscribe(topic: string, callback: (message: IMessage) => void): string | null {
    if (!wsClient || connectionState !== ConnectionStateEnum.CONNECTED) {
      console.warn("WebSocket client is not connected. Cannot subscribe to topic:", topic)
      return null
    }

    const subscription = wsClient.subscribe(topic, callback)
    subscriptionsRef.current.set(subscription.id, subscription)
    return subscription.id
  }

  function unsubscribe(subscriptionId: string): void {
    const subscription = subscriptionsRef.current.get(subscriptionId)
    if (!subscription) {
      console.warn("WebSocket subscription not found:", subscriptionId)
      return
    }

    subscriptionsRef.current.delete(subscriptionId)
    subscription.unsubscribe()
  }

  const contextValue = {
    client: wsClient,
    connectionState,
    subscribe,
    unsubscribe,
  }

  return <WebsocketContext.Provider value={contextValue}>{children}</WebsocketContext.Provider>
}

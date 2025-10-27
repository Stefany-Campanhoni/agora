import { createContext, useContext } from "react"
import type { IWebsocketContext } from "../../service/websocket/websocket.types"

const defaultContext: IWebsocketContext = {
  client: null,
  connectionState: "DISCONNECTED",
  subscribe: () => {
    console.error("WebsocketProvider não encontrado.")
    return null
  },
  unsubscribe: () => {
    console.error("WebsocketProvider não encontrado.")
  },
}

export const WebsocketContext = createContext<IWebsocketContext>(defaultContext)

export const useWebsocket = () => {
  const context = useContext(WebsocketContext)
  if (context === defaultContext) {
    throw new Error("useWebsocket deve ser usado dentro de um WebsocketProvider")
  }
  return context
}

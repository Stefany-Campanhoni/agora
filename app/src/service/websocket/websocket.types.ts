import { Client, type IMessage } from "@stomp/stompjs"

export type ConnectionState = "DISCONNECTED" | "CONNECTING" | "CONNECTED" | "ERROR"
export type AdminDashboardUpdateMessage = {
  userQuantity: number
  roomQuantity: number
  reservationQuantity: number
}

export enum ConnectionStateEnum {
  DISCONNECTED = "DISCONNECTED",
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  ERROR = "ERROR",
}

export interface IWebsocketContext {
  client: Client | null
  connectionState: ConnectionState
  subscribe: (destination: string, callback: (message: IMessage) => void) => string | null
  unsubscribe: (subscriptionId: string) => void
}

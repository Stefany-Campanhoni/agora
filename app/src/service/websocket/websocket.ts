import { Client } from "@stomp/stompjs"

let globalWsClient: Client | null = null

export function createWebsocketClient(): Client {
  return new Client({
    brokerURL: "ws://localhost:8080/ws",
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  })
}

export function setGlobalWebsocketClient(client: Client | null): void {
  globalWsClient = client
}

export function getGlobalWebsocketClient(): Client | null {
  return globalWsClient
}

export function publishUpdateMessage(): void {
  if (!globalWsClient) {
    console.warn("WebSocket não está conectado. Não foi possível publicar mensagem.")
    return
  }

  try {
    const topic = `/app/update`

    globalWsClient.publish({
      destination: topic,
    })

    console.log(`Mensagem publicada em ${topic}`)
  } catch (error) {
    console.error("Erro ao publicar mensagem WebSocket:", error)
  }
}

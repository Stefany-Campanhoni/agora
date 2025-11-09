import axios, { type AxiosError, type AxiosResponse } from "axios"
import { persistor, store } from "../store"
import { logout } from "../store/slices/authSlice"
import { publishUpdateMessage } from "./websocket/websocket"

export const API_URL = "http://localhost:8080"

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: API_URL,
})

let isLoggingOut = false

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.token
    const isAuthenticated = state.auth.isAuthenticated
    const headers = config.headers

    if (token && isAuthenticated) {
      headers.Authorization = `Bearer ${token}`
    } else if (headers && headers.Authorization) {
      delete headers.Authorization
    }
    config.url = config.url?.replaceAll("//", "/")

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    try {
      const status = response.status
      const method = response.config.method

      const isSuccessfulDelete = method?.toLocaleLowerCase() === "delete" && status === 204
      if (status === 201 || isSuccessfulDelete) {
        publishUpdateMessage()
      }
    } catch (error) {
      console.error("Erro ao publicar notificação WebSocket:", error)
    }

    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true

      store.dispatch(logout())
      await persistor.flush()

      window.location.href = "/user/login"

      isLoggingOut = false
    }

    return Promise.reject(error)
  },
)

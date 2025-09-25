import axios, { type AxiosError, type AxiosResponse } from "axios"
import { store } from "../store"
import { logout } from "../store/authSlice"

export const API_URL = "http://localhost:8080"

export const apiClient = axios.create({
  baseURL: API_URL,
})

let isLoggingOut = false

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401 && !isLoggingOut) {
      isLoggingOut = true

      store.dispatch(logout())

      window.location.href = "/user/login"

      isLoggingOut = false
    }

    return Promise.reject(error)
  },
)

import axios, { type AxiosError, type AxiosResponse } from "axios"
import { persistor, store } from "../store"
import { logout } from "../store/slices/authSlice"

export const API_URL = "http://localhost:8080"

export const apiClient = axios.create({
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

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type UserRole = "ADMIN" | "USER"

export interface AuthState {
  token: string | null
  isAuthenticated: boolean
  role: UserRole | null
  email: string | null
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  role: null,
  email: null,
}

interface LoginPayload {
  token: string
  role: UserRole
  email: string
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.token
      state.isAuthenticated = true
      state.role = action.payload.role
      state.email = action.payload.email
    },
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      state.role = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

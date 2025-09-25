import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type UserRole = "ADMIN" | "USER"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  role: UserRole | null
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  role: null,
}

interface LoginPayload {
  token: string
  role: UserRole
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.token
      state.isAuthenticated = true
      state.role = action.payload.role
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

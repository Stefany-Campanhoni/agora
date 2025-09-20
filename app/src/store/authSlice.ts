import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Definindo o tipo do estado da autenticação
interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

// Estado inicial
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
}

// Criando o slice de autenticação
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action para fazer login (armazenar o token)
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
    },
    // Action para fazer logout (limpar o token)
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
    },
  },
})

// Exportando as actions
export const { login, logout } = authSlice.actions

// Exportando o reducer como default
export default authSlice.reducer

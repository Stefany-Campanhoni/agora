import { jwtDecode } from "jwt-decode"
import { login, logout, type UserRole } from "../store/slices/authSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { AuthState } from "../store/slices/authSlice"

interface DecodedToken {
  scope: UserRole
  sub: string
}

export function useAuth() {
  const dispatch = useAppDispatch()
  const { token, isAuthenticated, role, email } = useAppSelector<AuthState>((state) => state.auth)

  const handleLogin = (token: string) => {
    const decodedToken = jwtDecode<DecodedToken>(token)
    const role = decodedToken.scope.includes("ADMIN") ? "ADMIN" : "USER"
    const email = decodedToken.sub

    dispatch(login({ token, role, email }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    token,
    isAuthenticated,
    role,
    email,
    isAdmin: role === "ADMIN",
    login: handleLogin,
    logout: handleLogout,
  }
}

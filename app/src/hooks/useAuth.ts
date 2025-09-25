import { jwtDecode } from "jwt-decode"
import { login, logout, type UserRole } from "../store/authSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

interface DecodedToken {
  scope: UserRole
}

export function useAuth() {
  const dispatch = useAppDispatch()
  const { token, isAuthenticated, role } = useAppSelector((state) => state.auth)

  const handleLogin = (token: string) => {
    const decodedToken = jwtDecode<DecodedToken>(token)
    const role = decodedToken.scope.includes("ADMIN") ? "ADMIN" : "USER"

    dispatch(login({ token, role }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    token,
    isAuthenticated,
    role,
    isAdmin: role === "ADMIN",
    login: handleLogin,
    logout: handleLogout,
  }
}

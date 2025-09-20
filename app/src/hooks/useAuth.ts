import { login, logout } from "../store/authSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { token, isAuthenticated } = useAppSelector((state) => state.auth)

  const handleLogin = (token: string) => {
    dispatch(login(token))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  }
}

import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/user/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  return <Outlet />
}

export function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (isAuthenticated && isAdmin) {
    return <Outlet />
  }

  return (
    <Navigate
      to="/user/login"
      replace
      state={{ from: location.pathname + location.search }}
    />
  )
}

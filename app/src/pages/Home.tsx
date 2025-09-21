import { useAuth } from "../hooks/useAuth"

export function Home() {
  const { isAuthenticated, token, logout } = useAuth()

  return isAuthenticated ? (
    <>
      <h1>Home, {token}</h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  ) : (
    <h1>Please log in</h1>
  )
}

import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { loadUser } from "../service/user/user.api"
import "./Home.css"

export function Home() {
  const { isAuthenticated, token, logout } = useAuth()

  // Use effect to check if the token is valid
  // If not, remove it from the state
  useEffect(() => {
    if (!token) return
    ;(async () => {
      await loadUser()
    })()
  }, [])

  return isAuthenticated ? (
    <div className="home-page">
      <h1>Bem-vindo!</h1>
      <p className="home-subtitle">Você está autenticado com o token:</p>
      <code className="home-token">{token}</code>
      <button
        type="button"
        className="home-action"
        onClick={() => logout()}
      >
        Sair
      </button>
    </div>
  ) : (
    <div className="home-page">
      <h1>Faça login para continuar</h1>
    </div>
  )
}

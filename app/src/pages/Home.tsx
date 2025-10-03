import { useAuth } from "../hooks/useAuth"
import "./Home.css"

export function Home() {
  const { isAuthenticated, token, logout } = useAuth()

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

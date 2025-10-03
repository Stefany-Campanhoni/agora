import { useNavigate } from "react-router-dom"
import { loginUser } from "../../api/user/user.api"
import {
  LoginForm,
  type LoginFormData,
} from "../../components/form/user/LoginForm"
import { useAuth } from "../../hooks/useAuth"

export function UserLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (data: LoginFormData) => {
    try {
      const { token } = await loginUser(data)

      login(token)
      navigate("/home")
    } catch (err) {
      console.error("Erro ao logar usuário:", err)
      alert("Erro ao logar usuário.")
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

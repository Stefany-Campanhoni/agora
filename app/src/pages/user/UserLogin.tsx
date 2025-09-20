import axios from "axios"
import { LoginForm, type LoginFormData } from "../../components/form/user/LoginForm"
import { login } from "../../store/authSlice"
import { useAppDispatch } from "../../store/hooks"

const API_URL = "http://localhost:8080"

export function UserLogin() {
  const dispatch = useAppDispatch()

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data)

      // Extraindo o token da resposta do backend
      const { token } = response.data

      // Despachando a action de login para armazenar o token no Redux
      dispatch(login(token))

      alert("Usuário logado com sucesso!")
    } catch (err) {
      console.error("Erro ao logar usuário:", err)
      alert("Erro ao logar usuário.")
    }
  }

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}

import axios from "axios"
import { LoginForm, type LoginFormData } from "../../components/form/user/LoginForm"
import { login } from "../../store/authSlice"
import { useAppDispatch } from "../../store/hooks"

const API_URL = "http://localhost:8080"

export function UserLogin() {
  const dispatch = useAppDispatch()

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, data)
      const { token } = response.data

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

import axios from "axios"
import { RegisterForm, type RegisterFormData } from "../../components/form/user/RegisterForm"

const API_URL = "http://localhost:8080"

export function UserRegistration() {
  const handleRegister = async (data: Omit<RegisterFormData, "confirmPassword">) => {
    try {
      await axios.post(`${API_URL}/users`, data)
      alert("Usuário registrado com sucesso!")
    } catch (err) {
      console.error("Erro ao registrar usuário:", err)
      alert("Erro ao registrar usuário.")
    }
  }

  return (
    <div>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  )
}

import { useNavigate } from "react-router-dom"
import { registerUser } from "../../api/user/user.api"
import { RegisterForm, type RegisterFormData } from "../../components/form/user/RegisterForm"
import { useAuth } from "../../hooks/useAuth"

export function UserRegistration() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleRegister = async (data: Omit<RegisterFormData, "confirmPassword">) => {
    try {
      const { token } = await registerUser(data)
      login(token)
      navigate("/home")
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

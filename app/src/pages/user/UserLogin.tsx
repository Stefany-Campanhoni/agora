import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../api/user/user.api"
import { Alert } from "../../components/alert/Alert"
import { BaseForm } from "../../components/form/BaseForm"
import { FormInput } from "../../components/form/FormInput"
import { useAuth } from "../../hooks/useAuth"

export type LoginFormData = {
  email: string
  password: string
}

export function UserLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const { token } = await loginUser(data)

      login(token)
      navigate("/home")
    } catch (err) {
      setErrorMessage("Erro ao logar usuário.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage(null)}
        />
      )}

      <BaseForm
        title="Entrar"
        onSubmit={handleSubmit(handleLogin)}
        submitText="Entrar"
        isLoading={isLoading}
      >
        <FormInput
          label="Email"
          type="email"
          placeholder="Digite seu email"
          register={register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          error={errors.email}
        />

        <FormInput
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          register={register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "Senha deve ter pelo menos 6 caracteres",
            },
          })}
          error={errors.password}
        />
      </BaseForm>
    </div>
  )
}

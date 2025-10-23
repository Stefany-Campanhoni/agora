import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { BaseForm } from "../../components/form/BaseForm"
import { FormInput } from "../../components/form/inputs/FormInput"
import { useAuth } from "../../hooks/useAuth"
import { registerUser } from "../../service/user/user.api"

export type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function UserRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()
  const password = watch("password")

  const handleRegister = async (data: Omit<RegisterFormData, "confirmPassword">) => {
    setIsLoading(true)
    try {
      const { token } = await registerUser(data)
      login(token)
      navigate("/home")
    } catch (err) {
      console.error("Erro ao registrar usuário:", err)
      alert("Erro ao registrar usuário.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <BaseForm
        title="Criar Conta"
        onSubmit={handleSubmit(handleRegister)}
        submitText="Criar Conta"
        isLoading={isLoading}
      >
        <FormInput
          label="Nome"
          type="text"
          placeholder="Digite seu nome completo"
          register={register("name", {
            required: "Nome é obrigatório",
            minLength: {
              value: 2,
              message: "Nome deve ter pelo menos 2 caracteres",
            },
          })}
          error={errors.name}
        />

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

        <FormInput
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          register={register("confirmPassword", {
            required: "Confirmação de senha é obrigatória",
            validate: (value) => value === password || "As senhas não coincidem",
          })}
          error={errors.confirmPassword}
        />
      </BaseForm>
    </div>
  )
}

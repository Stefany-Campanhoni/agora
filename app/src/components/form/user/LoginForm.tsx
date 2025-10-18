import { useForm } from "react-hook-form"
import { BaseForm } from "../BaseForm"
import { FormInput } from "../FormInput"

export type LoginFormData = {
  email: string
  password: string
}

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void | Promise<void>
  isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data)
  }

  return (
    <BaseForm
      title="Entrar"
      onSubmit={handleSubmit(handleFormSubmit)}
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
  )
}

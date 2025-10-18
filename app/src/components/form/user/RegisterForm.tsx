import { useForm } from "react-hook-form"
import { BaseForm } from "../BaseForm"
import { FormInput } from "../FormInput"

export type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterFormProps = {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void | Promise<void>
  isLoading?: boolean
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const password = watch("password")

  const handleFormSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...submitData } = data
    onSubmit(submitData)
  }

  return (
    <BaseForm
      title="Criar Conta"
      onSubmit={handleSubmit(handleFormSubmit)}
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
  )
}

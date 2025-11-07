import { useNavigate, useSearchParams } from "react-router-dom"
import { FormInput } from "../../components/form/inputs/FormInput"
import { useForm } from "react-hook-form"
import { BaseForm } from "../../components/form/BaseForm"
import { useState } from "react"
import { resetPassword } from "../../service/user/user.api"
import type { ResetPasswordPayload } from "../../service/user/user.types"

export type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>()
  const password = watch("password")

  if (!token) {
    return <div>Invalid or missing token.</div>
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    try {
      const payload: ResetPasswordPayload = {
        newPassword: data.password,
        email: email || "",
        token: token || "",
      }
      await resetPassword(payload)
      alert("Password reset successfully.")
      navigate("/login")
    } catch (err) {
      console.error("Error resetting password:", err)
      alert("Error resetting password.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <BaseForm
        title="Resetar Senha"
        onSubmit={handleSubmit(onSubmit)}
        submitText="Resetar Senha"
        isLoading={isLoading}
      >
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

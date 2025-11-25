import { useState } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Alert, type AlertType } from "../../components/alert/Alert"
import { BaseForm } from "../../components/form/BaseForm"
import { FormInput } from "../../components/form/inputs/FormInput"
import { resetPassword } from "../../service/user/user.api"
import type { ResetPasswordPayload } from "../../service/user/user.types"

export type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null)
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

  if (!token || !email) {
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
      setSuccessMessage("Senha resetada com sucesso!")
    } catch (err) {
      console.error("Error resetting password:", err)
      setAlert({ message: "Error resetting password.", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {successMessage ? (
        <div>
          <p>{successMessage}</p>
          <Button onClick={() => navigate("/user/login")}>Ir para Login</Button>
        </div>
      ) : (
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
      )}
    </div>
  )
}

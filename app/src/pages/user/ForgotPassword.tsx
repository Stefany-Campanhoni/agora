import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Alert } from "../../components/alert/Alert"
import { BaseForm } from "../../components/form/BaseForm"
import { FormInput } from "../../components/form/inputs/FormInput"
import { forgotPassword } from "../../service/user/user.api"

export type ForgotPasswordFormData = {
  email: string
}

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>()

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    try {
      await forgotPassword(data)
      setSuccessMessage(
        "Email enviado com sucesso! Verifique sua caixa de entrada para instruções de reset de senha.",
      )
      setTimeout(() => {
        navigate("/user/login")
      }, 3000)
    } catch (err) {
      console.error("Erro ao enviar email de reset:", err)
      setErrorMessage("Erro ao enviar email de reset. Tente novamente.")
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

      {successMessage && (
        <Alert
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <BaseForm
        title="Esqueci Minha Senha"
        onSubmit={handleSubmit(handleForgotPassword)}
        submitText="Enviar Email"
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
      </BaseForm>
    </div>
  )
}

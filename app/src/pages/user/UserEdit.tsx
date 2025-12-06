import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { Alert } from "../../components/alert/Alert"
import { BaseForm } from "../../components/form/BaseForm"
import { FormInput } from "../../components/form/inputs/FormInput"
import { canEditUser, updateUser } from "../../service/user/user.api"
import type { User } from "../../service/user/user.types"
import { useAuth } from "../../hooks/useAuth"

export type EditFormData = {
  name: string
}

export function UserEdit() {
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditFormData>({ defaultValues: { name: "" } })
  const { email } = useAuth()

  useEffect(() => {
    const currentUser = location.state?.user as User
    const canEdit = canEditUser(currentUser)
    if (!currentUser || !canEdit) navigate(-1)

    setValue("name", currentUser.name)
    setIsLoading(false)
  }, [])

  const handleFormSubmit = async (data: EditFormData) => {
    setIsLoading(true)
    try {
      await updateUser(data, email!)
      navigate(-1)
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
      setErrorMessage("Ocorreu um erro ao editar. Por favor, tente novamente mais tarde.")
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
        title="Editar Usuário"
        onSubmit={handleSubmit(handleFormSubmit)}
        submitText="Salvar"
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
      </BaseForm>
    </div>
  )
}

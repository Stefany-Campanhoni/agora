import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"

import { Alert } from "@/components/alert/Alert"
import { BaseForm } from "@/components/form/BaseForm"
import { FormInput } from "@/components/form/inputs/FormInput"
import { Label } from "@/components/ui/label"
import { createRoom, getRoomById, updateRoom } from "@/service/room/room.api"
import type { Room, RoomRequest } from "@/service/room/room.types"

export type RoomFormData = {
  name: string
  description: string
  capacity: number
  location: string
}

export function RoomForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(!!id)
  const [initialData, setInitialData] = useState<Partial<Room>>({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoomFormData>({
    defaultValues: {
      name: "",
      description: "",
      capacity: 1,
      location: "",
    },
  })

  useEffect(() => {
    if (id) {
      setIsEditMode(true)
      loadRoom(parseInt(id, 10))
    } else {
      setIsEditMode(false)
      setInitialData({})
      setPageLoading(false)
      reset({
        name: "",
        description: "",
        capacity: 1,
        location: "",
      })
    }
  }, [id])

  useEffect(() => {
    if (isEditMode && initialData && Object.keys(initialData).length > 0) {
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
        capacity: initialData.capacity || 1,
        location: initialData.location || "",
      })
    } else if (!isEditMode) {
      reset({
        name: "",
        description: "",
        capacity: 1,
        location: "",
      })
    }
  }, [initialData, isEditMode, reset])

  const loadRoom = async (roomId: number) => {
    try {
      setPageLoading(true)
      const room = await getRoomById(roomId)
      setInitialData(room)
    } catch (error) {
      console.error("Erro ao carregar sala:", error)
      setAlert({ message: "Erro ao carregar dados da sala", type: "error" })
      navigate("/rooms")
    } finally {
      setPageLoading(false)
    }
  }

  const handleFormSubmit = async (data: RoomRequest) => {
    try {
      setIsLoading(true)

      if (isEditMode && id) {
        await updateRoom(parseInt(id, 10), data)
        setAlert({ message: "Sala atualizada com sucesso!", type: "success" })
      } else {
        await createRoom(data)
        setAlert({ message: "Sala criada com sucesso!", type: "success" })
      }

      setTimeout(() => navigate("/rooms"), 2000)
    } catch (error) {
      console.error("Erro ao salvar sala:", error)
      setAlert({
        message: "Erro ao salvar sala. Tente novamente.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const title = !isEditMode ? "Criar Sala" : "Editar Sala"
  const submitText = !isEditMode ? "Criar Sala" : "Salvar Alterações"

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {alert && (
        <Alert
          type={alert.type}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      <BaseForm
        title={title}
        onSubmit={handleSubmit(handleFormSubmit)}
        submitText={submitText}
        isLoading={isLoading}
        showBackButton
      >
        <FormInput
          label="Nome da Sala"
          placeholder="Digite o nome da sala"
          register={register("name", {
            required: "Nome da sala é obrigatório",
            minLength: {
              value: 2,
              message: "Nome deve ter pelo menos 2 caracteres",
            },
          })}
          error={errors.name}
        />

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            rows={3}
            placeholder="Digite uma descrição para a sala (opcional)"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>

        <FormInput
          label="Capacidade"
          type="number"
          placeholder="Digite a capacidade da sala"
          register={register("capacity", {
            required: "Capacidade é obrigatória",
            min: {
              value: 1,
              message: "Capacidade deve ser pelo menos 1",
            },
            valueAsNumber: true,
          })}
          error={errors.capacity}
        />

        <FormInput
          label="Localização"
          placeholder="Digite a localização da sala"
          register={register("location", {
            required: "Localização é obrigatória",
            minLength: {
              value: 2,
              message: "Localização deve ter pelo menos 2 caracteres",
            },
          })}
          error={errors.location}
        />
      </BaseForm>
    </div>
  )
}

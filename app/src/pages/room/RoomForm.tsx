import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { createRoom, getRoomById, updateRoom } from "../../api/room/room.api"
import type { RoomRequest, RoomResponse } from "../../api/room/room.responses"
import { BaseForm } from "../../components/form/BaseForm"
import { FormInput } from "../../components/form/FormInput"
import "./RoomForm.css"

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
  const [initialData, setInitialData] = useState<Partial<RoomResponse>>({})
  const [isEditMode, setIsEditMode] = useState(false)
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
      setIsLoading(false)
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
      setIsLoading(true)
      const room = await getRoomById(roomId)
      setInitialData(room)
    } catch (error) {
      console.error("Erro ao carregar sala:", error)
      alert("Erro ao carregar dados da sala")
      navigate("/rooms")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = async (data: RoomRequest) => {
    try {
      setIsLoading(true)

      if (isEditMode && id) {
        await updateRoom(parseInt(id, 10), data)
        alert("Sala atualizada com sucesso!")
      } else {
        await createRoom(data)
        alert("Sala criada com sucesso!")
      }

      navigate("/rooms")
    } catch (error) {
      console.error("Erro ao salvar sala:", error)
      alert("Erro ao salvar sala. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const title = !isEditMode ? "Criar Sala" : "Editar Sala"
  const submitText = !isEditMode ? "Criar Sala" : "Salvar Alterações"

  return (
    <div className="room-form-container">
      <BaseForm
        title={title}
        onSubmit={handleSubmit(handleFormSubmit)}
        submitText={submitText}
        isLoading={isLoading}
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

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite uma descrição para a sala (opcional)"
            {...register("description")}
            isInvalid={!!errors.description}
          />
          {errors.description && (
            <Form.Control.Feedback type="invalid">
              {errors.description.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

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

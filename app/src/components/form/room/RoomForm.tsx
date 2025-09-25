import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import type { RoomRequest } from "../../../api/room/room.responses"
import { BaseForm } from "../BaseForm"
import "./RoomForm.css"

export type RoomFormData = {
  name: string
  description: string
  capacity: number
  location: string
}

export type RoomFormProps = {
  onSubmit: (data: RoomRequest) => void | Promise<void>
  isLoading?: boolean
  initialData?: Partial<RoomFormData>
  mode?: "create" | "edit"
}

export function RoomForm({
  onSubmit,
  isLoading = false,
  initialData = {},
  mode = "create",
}: RoomFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormData>({
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      capacity: initialData.capacity || 1,
      location: initialData.location || "",
    },
  })

  const handleFormSubmit = (data: RoomFormData) => {
    const submitData: RoomRequest = {
      name: data.name,
      description: data.description || undefined,
      capacity: data.capacity,
      location: data.location,
    }
    onSubmit(submitData)
  }

  const title = mode === "create" ? "Criar Sala" : "Editar Sala"
  const submitText = mode === "create" ? "Criar Sala" : "Salvar Alterações"

  return (
    <div className="room-form-container">
      <BaseForm
        title={title}
        onSubmit={handleSubmit(handleFormSubmit)}
        submitText={submitText}
        isLoading={isLoading}
      >
        <Form.Group className="mb-3">
          <Form.Label>Nome da Sala</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome da sala"
            {...register("name", {
              required: "Nome da sala é obrigatório",
              minLength: {
                value: 2,
                message: "Nome deve ter pelo menos 2 caracteres",
              },
            })}
            isInvalid={!!errors.name}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>
          )}
        </Form.Group>

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

        <Form.Group className="mb-3">
          <Form.Label>Capacidade</Form.Label>
          <Form.Control
            type="number"
            min="1"
            placeholder="Digite a capacidade da sala"
            {...register("capacity", {
              required: "Capacidade é obrigatória",
              min: {
                value: 1,
                message: "Capacidade deve ser pelo menos 1",
              },
              valueAsNumber: true,
            })}
            isInvalid={!!errors.capacity}
          />
          {errors.capacity && (
            <Form.Control.Feedback type="invalid">{errors.capacity.message}</Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Localização</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a localização da sala"
            {...register("location", {
              required: "Localização é obrigatória",
              minLength: {
                value: 2,
                message: "Localização deve ter pelo menos 2 caracteres",
              },
            })}
            isInvalid={!!errors.location}
          />
          {errors.location && (
            <Form.Control.Feedback type="invalid">{errors.location.message}</Form.Control.Feedback>
          )}
        </Form.Group>
      </BaseForm>
    </div>
  )
}

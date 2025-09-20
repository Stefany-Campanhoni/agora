import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { BaseForm } from "../BaseForm"

export type LoginFormData = {
  email: string
  password: string
}

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void | Promise<void>
  isLoading?: boolean
  onRegisterClick?: () => void
}

export function LoginForm({ onSubmit, isLoading = false, onRegisterClick }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data)
  }

  const footerContent = onRegisterClick && (
    <div>
      <span className="text-muted">Não tem uma conta? </span>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onRegisterClick()
        }}
      >
        Criar conta
      </a>
    </div>
  )

  return (
    <BaseForm
      title="Entrar"
      onSubmit={handleSubmit(handleFormSubmit)}
      submitText="Entrar"
      isLoading={isLoading}
      footerContent={footerContent}
    >
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Digite seu email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Digite sua senha"
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "Senha deve ter pelo menos 6 caracteres",
            },
          })}
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>
        )}
      </Form.Group>
    </BaseForm>
  )
}

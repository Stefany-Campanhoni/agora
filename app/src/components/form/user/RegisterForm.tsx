import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { BaseForm } from "../BaseForm"

export type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterFormProps = {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void | Promise<void>
  isLoading?: boolean
  onLoginClick?: () => void
}

export function RegisterForm({ onSubmit, isLoading = false, onLoginClick }: RegisterFormProps) {
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

  const footerContent = onLoginClick && (
    <div>
      <span className="text-muted">Já tem uma conta? </span>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onLoginClick()
        }}
      >
        Fazer login
      </a>
    </div>
  )

  return (
    <BaseForm
      title="Criar Conta"
      onSubmit={handleSubmit(handleFormSubmit)}
      submitText="Criar Conta"
      isLoading={isLoading}
      footerContent={footerContent}
    >
      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite seu nome completo"
          {...register("name", {
            required: "Nome é obrigatório",
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

      <Form.Group className="mb-3">
        <Form.Label>Confirmar Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirme sua senha"
          {...register("confirmPassword", {
            required: "Confirmação de senha é obrigatória",
            validate: (value) => value === password || "As senhas não coincidem",
          })}
          isInvalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </BaseForm>
  )
}

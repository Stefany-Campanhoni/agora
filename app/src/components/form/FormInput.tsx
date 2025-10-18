import { Form } from "react-bootstrap"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import "./FormInput.css"

export type FormInputProps = {
  label: string
  type?: string
  placeholder?: string
  register: UseFormRegisterReturn
  error?: FieldError
}

export function FormInput({ label, type = "text", placeholder, register, error }: FormInputProps) {
  return (
    <Form.Group className="mb-3 form-input-group">
      <Form.Label className="form-input-label">{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className="form-input-control"
        {...register}
        isInvalid={!!error}
      />
      {error && (
        <Form.Control.Feedback
          type="invalid"
          className="form-input-feedback"
        >
          {error.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  )
}

import type { ReactNode } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./BaseForm.css"

interface BaseFormProps {
  title: string
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  submitText: string
  isLoading?: boolean
  showBackButton?: boolean
}

export function BaseForm({
  title,
  children,
  onSubmit,
  submitText,
  isLoading = false,
  showBackButton = true,
}: BaseFormProps) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="base-form-container">
      <Card className="base-form-card">
        <Card.Header className="base-form-header">
          {showBackButton && (
            <Button
              variant="link"
              className="base-form-back-button"
              onClick={handleGoBack}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M12 5L5 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Voltar
            </Button>
          )}
          <h3 className="base-form-title">{title}</h3>
        </Card.Header>
        <Card.Body className="base-form-body">
          <Form
            onSubmit={onSubmit}
            className="base-form"
          >
            {children}
            <Button
              type="submit"
              className="base-form-submit"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? "Carregando..." : submitText}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

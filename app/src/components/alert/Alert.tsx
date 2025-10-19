import { useEffect } from "react"
import "./Alert.css"

export type AlertType = "error" | "success" | "warning"

export type AlertProps = {
  message: string
  type?: AlertType
  onClose: () => void
  autoClose?: boolean
  autoCloseDuration?: number
}

export function Alert({
  message,
  type = "error",
  onClose,
  autoClose = true,
  autoCloseDuration = 5000,
}: AlertProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoCloseDuration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDuration, onClose])

  const getIcon = () => {
    switch (type) {
      case "error":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="alert-icon"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 7V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="16"
              r="1"
              fill="currentColor"
            />
          </svg>
        )
      case "success":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="alert-icon"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "warning":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="alert-icon"
          >
            <path
              d="M12 2L2 20H22L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M12 9V13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="17"
              r="1"
              fill="currentColor"
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <div className="alert-icon-wrapper">{getIcon()}</div>
        <p className="alert-message">{message}</p>
        <button
          className="alert-close-btn"
          onClick={onClose}
          aria-label="Fechar alerta"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

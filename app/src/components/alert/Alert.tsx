import { useEffect } from "react"
import { X, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export type AlertType = "error" | "success" | "warning"

export type AlertProps = {
  message?: string
  type?: AlertType
  onClose: () => void
  autoClose?: boolean
  autoCloseDuration?: number
  children?: React.ReactNode
}

const alertStyles = {
  error: "bg-destructive/10 border-destructive text-destructive",
  success: "bg-green-50 border-green-500 text-green-700 dark:bg-green-950/20 dark:text-green-400",
  warning: "bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400",
}

const iconStyles = {
  error: "text-destructive",
  success: "text-green-500 dark:text-green-400",
  warning: "text-amber-500 dark:text-amber-400",
}

export function Alert({
  message,
  type = "error",
  onClose,
  autoClose = true,
  autoCloseDuration = 5000,
  children,
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
        return <AlertCircle className={cn("h-5 w-5", iconStyles[type])} />
      case "success":
        return <CheckCircle className={cn("h-5 w-5", iconStyles[type])} />
      case "warning":
        return <AlertTriangle className={cn("h-5 w-5", iconStyles[type])} />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-lg border p-4 shadow-sm",
        alertStyles[type],
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <p className="flex-1 text-sm font-medium">{message ? message : children}</p>
      <button
        onClick={onClose}
        className={cn(
          "flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10",
          iconStyles[type],
        )}
        aria-label="Fechar alerta"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

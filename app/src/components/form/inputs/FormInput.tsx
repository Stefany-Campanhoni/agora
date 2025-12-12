import type { HTMLInputTypeAttribute } from "react"
import type { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type FormInputProps = {
  label: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  register: UseFormRegisterReturn
  error?: FieldError
  className?: string
  disabled?: boolean
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  register,
  error,
  className,
  disabled,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={register.name}
        className="text-sm font-medium"
      >
        {label}
      </Label>
      <Input
        id={register.name}
        type={type}
        placeholder={placeholder}
        className={cn(error && "border-destructive focus-visible:ring-destructive", className)}
        disabled={disabled}
        {...register}
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  )
}

import { ptBR } from "date-fns/locale/pt-BR"
import { forwardRef, useCallback, useMemo } from "react"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { type Control, Controller, type FieldError } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import "./TimePicker.css"

registerLocale("pt-BR", ptBR)

export type TimePickerProps = {
  label: string
  name: string
  control: Control<any>
  error?: FieldError
  displayDisabledHint?: boolean
  disabledTimes?: (string | Date)[]
  minTime?: Date
  maxTime?: Date
  placeholder?: string
  timeFormat?: string
  timeIntervals?: number
  className?: string
  required?: boolean
  onChange?: (time: string) => void
}

export function TimePicker({
  label,
  name,
  control,
  error,
  displayDisabledHint = true,
  disabledTimes = [],
  minTime,
  maxTime,
  placeholder = "Selecione um horário",
  timeFormat = "HH:mm",
  timeIntervals = 30,
  className = "",
  required = false,
  onChange,
}: TimePickerProps) {
  const normalizedDisabledTimes = useMemo(() => {
    return disabledTimes.map((time) => {
      if (time instanceof Date) {
        return time
      }
      const [hours, minutes] = time.split(":").map(Number)
      const date = new Date()
      date.setHours(hours, minutes, 0, 0)
      return date
    })
  }, [disabledTimes])

  const isTimeDisabled = useCallback(
    (time: Date): boolean => {
      return normalizedDisabledTimes.some((disabledTime) => {
        return (
          time.getHours() === disabledTime.getHours() &&
          time.getMinutes() === disabledTime.getMinutes()
        )
      })
    },
    [normalizedDisabledTimes],
  )

  const filterDisabledTimes = useCallback(
    (time: Date): boolean => {
      return !isTimeDisabled(time)
    },
    [isTimeDisabled],
  )

  const getTimeClassName = useCallback(
    (time: Date): string => {
      if (isTimeDisabled(time)) {
        return "disabled-time"
      }
      return ""
    },
    [isTimeDisabled],
  )

  const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick, onChange: inputOnChange }, ref) => {
      return (
        <input
          ref={ref}
          type="text"
          value={value}
          onClick={onClick}
          onChange={inputOnChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
          placeholder={placeholder}
          readOnly
        />
      )
    },
  )
  CustomInput.displayName = "CustomInput"

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Campo obrigatório" : false }}
      render={({ field }) => (
        <div className="space-y-2">
          {label && (
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}

          <ReactDatePicker
            selected={field.value ? new Date(`2000-01-01T${field.value}`) : null}
            onChange={(date: Date | null) => {
              if (date) {
                const hours = String(date.getHours()).padStart(2, "0")
                const minutes = String(date.getMinutes()).padStart(2, "0")
                field.onChange(`${hours}:${minutes}`)
                if (onChange) onChange(`${hours}:${minutes}`)
              } else {
                field.onChange("")
                if (onChange) onChange("")
              }
            }}
            onBlur={field.onBlur}
            showTimeSelect
            showTimeSelectOnly
            minTime={minTime}
            maxTime={maxTime}
            filterTime={filterDisabledTimes}
            timeClassName={getTimeClassName}
            placeholderText={placeholder}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            dateFormat={timeFormat}
            customInput={<CustomInput />}
            calendarClassName="custom-time-calendar"
            wrapperClassName="time-picker-wrapper w-full"
            locale="pt-BR"
            timeCaption="Horário"
          />

          {error && <p className="text-sm text-destructive">{error.message}</p>}

          {normalizedDisabledTimes.length > 0 && displayDisabledHint && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>ℹ️</span>
              <span>
                {normalizedDisabledTimes.length}{" "}
                {normalizedDisabledTimes.length === 1
                  ? "horário indisponível"
                  : "horários indisponíveis"}
              </span>
            </div>
          )}
        </div>
      )}
    />
  )
}

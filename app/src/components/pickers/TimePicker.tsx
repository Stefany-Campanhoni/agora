import { ptBR } from "date-fns/locale/pt-BR"
import { forwardRef, useCallback, useMemo } from "react"
import { Form } from "react-bootstrap"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { type Control, Controller, type FieldError } from "react-hook-form"
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

  const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick, onChange }, ref) => {
    return (
      <Form.Control
        ref={ref}
        type="text"
        value={value}
        onClick={onClick}
        onChange={onChange}
        isInvalid={!!error}
        className={`time-picker-control ${className}`}
        placeholder={placeholder}
        readOnly
      />
    )
  })
  CustomInput.displayName = "CustomInput"

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Campo obrigatório" : false }}
      render={({ field }) => (
        <Form.Group className="picker-group">
          {label && <Form.Label className="picker-label">{label}</Form.Label>}

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
            wrapperClassName="time-picker-wrapper"
            locale="pt-BR"
            timeCaption="Horário"
          />

          {error && (
            <Form.Control.Feedback
              type="invalid"
              className="picker-error d-block"
            >
              {error.message}
            </Form.Control.Feedback>
          )}

          {normalizedDisabledTimes.length > 0 && displayDisabledHint && (
            <div className="picker-hint">
              <span className="hint-icon">ℹ️</span>
              <span className="hint-text">
                {normalizedDisabledTimes.length}{" "}
                {normalizedDisabledTimes.length === 1
                  ? "horário indisponível"
                  : "horários indisponíveis"}
              </span>
            </div>
          )}
        </Form.Group>
      )}
    />
  )
}

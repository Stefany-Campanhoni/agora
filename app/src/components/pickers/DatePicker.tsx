import { ptBR } from "date-fns/locale/pt-BR"
import { forwardRef, useCallback, useMemo } from "react"
import { Form } from "react-bootstrap"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { type Control, Controller, type FieldError } from "react-hook-form"
import "./DatePicker.css"

registerLocale("pt-BR", ptBR)

export type DatePickerProps = {
  label: string
  name: string
  control: Control<any>
  error?: FieldError
  disabledDates?: (string | Date)[]
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  dateFormat?: string
  showTimeSelect?: boolean
  className?: string
  required?: boolean
  onChange?: (date: string) => void
}

export function DatePicker({
  label,
  name,
  control,
  error,
  disabledDates = [],
  minDate,
  maxDate,
  placeholder = "Selecione uma data",
  dateFormat = "dd/MM/yyyy",
  showTimeSelect = false,
  className = "",
  required = false,
  onChange,
}: DatePickerProps) {
  const normalizedDisabledDates = useMemo(() => {
    return disabledDates.map((date) => {
      if (date instanceof Date) {
        return date
      }
      return new Date(date + "T00:00:00")
    })
  }, [disabledDates])

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      return normalizedDisabledDates.some((disabledDate) => {
        return (
          date.getFullYear() === disabledDate.getFullYear() &&
          date.getMonth() === disabledDate.getMonth() &&
          date.getDate() === disabledDate.getDate()
        )
      })
    },
    [normalizedDisabledDates],
  )

  const filterDisabledDates = useCallback(
    (date: Date): boolean => {
      return !isDateDisabled(date)
    },
    [isDateDisabled],
  )

  const getDayClassName = useCallback(
    (date: Date): string => {
      if (isDateDisabled(date)) {
        return "disabled-date"
      }
      return ""
    },
    [isDateDisabled],
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
        className={`date-picker-control ${className}`}
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
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => {
              // Atualiza o valor no react-hook-form
              const dateStr = date ? date.toISOString().split("T")[0] : ""
              field.onChange(dateStr)
              if (onChange) onChange(dateStr)
            }}
            onBlur={field.onBlur}
            minDate={minDate}
            maxDate={maxDate}
            filterDate={filterDisabledDates}
            dayClassName={getDayClassName}
            placeholderText={placeholder}
            dateFormat={dateFormat}
            showTimeSelect={showTimeSelect}
            customInput={<CustomInput />}
            calendarClassName="custom-calendar"
            wrapperClassName="date-picker-wrapper"
            locale="pt-BR"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          {error && (
            <Form.Control.Feedback
              type="invalid"
              className="picker-error d-block"
            >
              {error.message}
            </Form.Control.Feedback>
          )}

          {normalizedDisabledDates.length > 0 && (
            <div className="picker-hint">
              <span className="hint-icon">ℹ️</span>
              <span className="hint-text">
                {normalizedDisabledDates.length}{" "}
                {normalizedDisabledDates.length === 1 ? "data indisponível" : "datas indisponíveis"}
              </span>
            </div>
          )}
        </Form.Group>
      )}
    />
  )
}

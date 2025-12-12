import { ptBR } from "date-fns/locale/pt-BR"
import { forwardRef, useCallback, useMemo } from "react"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { type Control, Controller, type FieldError } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
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
            selected={field.value ? new Date(field.value + "T00:00:00") : null}
            onChange={(date: Date | null) => {
              const dateStr = date
                ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                    date.getDate(),
                  ).padStart(2, "0")}`
                : ""
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
            wrapperClassName="date-picker-wrapper w-full"
            locale="pt-BR"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          {error && <p className="text-sm text-destructive">{error.message}</p>}

          {normalizedDisabledDates.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>ℹ️</span>
              <span>
                {normalizedDisabledDates.length}{" "}
                {normalizedDisabledDates.length === 1 ? "data indisponível" : "datas indisponíveis"}
              </span>
            </div>
          )}
        </div>
      )}
    />
  )
}

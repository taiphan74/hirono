"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const datePickerTriggerVariants = cva(
  "group/date-picker flex h-10 min-w-[120px] items-center gap-2 rounded-[16px] border bg-white px-4 py-3 text-base leading-[1] text-[#1E1E1E] outline-none transition-colors disabled:cursor-not-allowed disabled:bg-[#D9D9D9] disabled:text-[#B3B3B3]",
  {
    variants: {
      state: {
        default: "border-[#D9D9D9]",
        error: "border-[#900B09]",
      },
      valueType: {
        default: "text-[#1E1E1E]",
        placeholder: "text-[#B3B3B3]",
      },
    },
    compoundVariants: [
      {
        state: "default",
        className: "disabled:border-[#B2B2B2]",
      },
      {
        state: "error",
        className: "disabled:border-[#B2B2B2]",
      },
    ],
    defaultVariants: {
      state: "default",
      valueType: "placeholder",
    },
  }
)

type DatePickerTriggerProps = Omit<React.ComponentProps<"button">, "value" | "onChange"> &
  VariantProps<typeof datePickerTriggerVariants> & {
    value?: string
    placeholder?: string
    onValueChange?: (value: string) => void
  }

function toDate(value: string): Date | undefined {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number)
    if (!year || !month || !day) return undefined
    return new Date(year, month - 1, day)
  }

  const parts = value.split("/")
  if (parts.length !== 3) return undefined
  const [day, month, year] = parts.map(Number)
  if (!day || !month || !year) return undefined
  return new Date(year, month - 1, day)
}

function toDisplayDate(value: Date): string {
  const day = String(value.getDate()).padStart(2, "0")
  const month = String(value.getMonth() + 1).padStart(2, "0")
  const year = value.getFullYear()
  return `${day}/${month}/${year}`
}

function DatePickerTrigger({
  className,
  state,
  valueType,
  value,
  placeholder = "Value",
  disabled,
  onValueChange,
  ...props
}: DatePickerTriggerProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value ? toDate(value) : undefined)

  React.useEffect(() => {
    setSelectedDate(value ? toDate(value) : undefined)
  }, [value])

  const hasValue = Boolean(selectedDate)
  const resolvedValueType = hasValue ? "default" : "placeholder"
  const displayValue = selectedDate ? toDisplayDate(selectedDate) : placeholder

  const handleSelect = (nextDate: Date | undefined): void => {
    setSelectedDate(nextDate)
    onValueChange?.(nextDate ? toDisplayDate(nextDate) : "")
    setOpen(false)
  }

  return (
    <Popover open={disabled ? false : open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="date-picker-trigger"
          data-state={state}
          data-value-type={valueType ?? resolvedValueType}
          disabled={disabled}
          className={cn(datePickerTriggerVariants({ state, valueType: valueType ?? resolvedValueType, className }))}
          {...props}
        >
          <span className="flex-1 truncate">{displayValue}</span>
          <CalendarIcon className="size-4 shrink-0 text-[#1E1E1E] group-disabled/date-picker:text-[#B3B3B3]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-[24px] border-[#D9D9D9] p-2" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePickerTrigger, datePickerTriggerVariants }
export type { DatePickerTriggerProps }

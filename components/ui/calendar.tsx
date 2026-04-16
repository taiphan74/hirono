"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps): React.JSX.Element {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-0", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-2",
        caption: "flex items-center justify-center pt-1 relative",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: "size-7 inline-flex items-center justify-center rounded-md border border-[#D9D9D9] bg-white text-[#1E1E1E] hover:bg-black/5",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "w-9 text-[0.8rem] font-normal text-[#757575]",
        row: "mt-1 flex w-full",
        cell: "size-9 text-center text-sm p-0 relative",
        day: "size-9 rounded-md text-sm text-[#1E1E1E] hover:bg-black/5",
        day_selected: "bg-surface-primary-default text-white hover:bg-surface-primary-hover",
        day_today: "border border-[#D9D9D9]",
        day_outside: "text-[#B3B3B3]",
        day_disabled: "text-[#B3B3B3]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("size-4", className)} {...props} />
          ) : (
            <ChevronRight className={cn("size-4", className)} {...props} />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
export type { CalendarProps }

"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { ComboboxField, type ComboboxVisualState } from "@/components/ui/combobox-field"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type SingleComboboxVariant = "label" | "labelList" | "icon"

export type ComboboxOption = {
  value: string
  label: string
  icon?: React.ReactNode
  group?: string
  disabled?: boolean
}

export type SingleComboboxProps = {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  variant?: SingleComboboxVariant
  className?: string
  popoverClassName?: string
  emptyText?: string
}

function groupOptions(options: ComboboxOption[]): Array<{ name?: string; items: ComboboxOption[] }> {
  const grouped = new Map<string | undefined, ComboboxOption[]>()

  options.forEach((option) => {
    const key = option.group
    const existing = grouped.get(key)

    if (existing) {
      existing.push(option)
      return
    }

    grouped.set(key, [option])
  })

  return Array.from(grouped.entries()).map(([name, items]) => ({ name, items }))
}

function renderOptionIcon(variant: SingleComboboxVariant, option: ComboboxOption): React.ReactNode {
  if (variant !== "icon") {
    return null
  }

  return <span className="flex size-5 shrink-0 items-center justify-center">{option.icon ?? null}</span>
}

export function SingleCombobox({
  options,
  value,
  defaultValue,
  onValueChange,
  open,
  onOpenChange,
  placeholder = "Select option",
  disabled = false,
  invalid = false,
  variant = "label",
  className,
  popoverClassName,
  emptyText = "No option found.",
  defaultOpen = false,
}: SingleComboboxProps): React.JSX.Element {
  const isValueControlled = value !== undefined
  const isOpenControlled = open !== undefined

  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)

  const selectedValue = isValueControlled ? value : internalValue
  const isOpen = isOpenControlled ? open : internalOpen

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  )
  const listboxId = React.useId()

  const hasSelection = Boolean(selectedOption)

  const visualState: ComboboxVisualState = disabled
    ? "disabled"
    : invalid
      ? "invalid"
      : isOpen
        ? "active"
        : hasSelection
          ? "selected"
          : "unselected"

  const setOpenState = React.useCallback(
    (nextOpen: boolean) => {
      if (disabled) {
        return
      }

      if (!isOpenControlled) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [disabled, isOpenControlled, onOpenChange]
  )

  const setValueState = React.useCallback(
    (nextValue: string) => {
      if (!isValueControlled) {
        setInternalValue(nextValue)
      }

      onValueChange?.(nextValue)
    },
    [isValueControlled, onValueChange]
  )

  const handleSelect = React.useCallback(
    (option: ComboboxOption) => {
      if (disabled || option.disabled) {
        return
      }

      setValueState(option.value)
      setOpenState(false)
    },
    [disabled, setOpenState, setValueState]
  )

  const groupedOptions = React.useMemo(() => groupOptions(options), [options])
  const showGrouped = variant === "labelList" || groupedOptions.some((group) => Boolean(group.name))

  return (
    <Popover open={isOpen} onOpenChange={setOpenState}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-invalid={invalid || undefined}
          aria-disabled={disabled || undefined}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <ComboboxField
            state={visualState}
            disabled={disabled}
            className={className}
            leadingIcon={variant === "icon" ? selectedOption?.icon : undefined}
            content={
              <span className={cn(!hasSelection && "text-[#757575]")}>
                {selectedOption?.label ?? placeholder}
              </span>
            }
          />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className={cn("w-[320px] p-2", popoverClassName)}>
        <Command>
          <CommandList id={listboxId}>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {showGrouped ? (
              groupedOptions.map((group, groupIndex) => (
                <React.Fragment key={group.name ?? `group-${groupIndex}`}>
                  <CommandGroup heading={group.name}>
                    {group.items.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        onSelect={() => handleSelect(option)}
                      >
                        {renderOptionIcon(variant, option)}
                        <span className="min-w-0 flex-1 truncate">{option.label}</span>
                        {selectedValue === option.value ? <Check className="size-4 shrink-0" /> : null}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {groupIndex < groupedOptions.length - 1 ? <CommandSeparator /> : null}
                </React.Fragment>
              ))
            ) : (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option)}
                  >
                    {renderOptionIcon(variant, option)}
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    {selectedValue === option.value ? <Check className="size-4 shrink-0" /> : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

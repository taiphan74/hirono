"use client"

import * as React from "react"
import { Check, X } from "lucide-react"

import { ComboboxField, type ComboboxVisualState } from "@/components/ui/combobox-field"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tag } from "@/components/ui/tag"
import { cn } from "@/lib/utils"

import type { ComboboxOption } from "@/components/ui/single-combobox"

export type MultiComboboxProps = {
  options: ComboboxOption[]
  values?: string[]
  defaultValues?: string[]
  onValuesChange?: (values: string[]) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
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

export function MultiCombobox({
  options,
  values,
  defaultValues,
  onValuesChange,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Add categories",
  disabled = false,
  invalid = false,
  className,
  popoverClassName,
  emptyText = "No option found.",
}: MultiComboboxProps): React.JSX.Element {
  const [query, setQuery] = React.useState("")
  const [internalValues, setInternalValues] = React.useState<string[]>(defaultValues ?? [])
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)

  const inputId = React.useId()
  const listboxId = React.useId()

  const resolvedValues = values ?? internalValues
  const resolvedOpen = open ?? internalOpen
  const isOpen = !disabled && resolvedOpen

  const selectedSet = React.useMemo(() => new Set(resolvedValues), [resolvedValues])
  const selectedOptions = React.useMemo(
    () => options.filter((option) => selectedSet.has(option.value)),
    [options, selectedSet]
  )

  const filteredOptions = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return options
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery))
  }, [options, query])

  const groupedOptions = React.useMemo(() => groupOptions(filteredOptions), [filteredOptions])
  const showGrouped = groupedOptions.some((group) => Boolean(group.name))

  const visualState: ComboboxVisualState = disabled
    ? "disabled"
    : invalid
      ? "invalid"
      : isOpen
        ? "active"
        : resolvedValues.length > 0
          ? "selected"
          : "unselected"

  const setValues = React.useCallback(
    (nextValues: string[]) => {
      if (values === undefined) {
        setInternalValues(nextValues)
      }

      onValuesChange?.(nextValues)
    },
    [onValuesChange, values]
  )

  const setOpenState = React.useCallback(
    (nextOpen: boolean) => {
      if (disabled) {
        return
      }

      if (open === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [disabled, onOpenChange, open]
  )

  const toggleValue = React.useCallback(
    (optionValue: string) => {
      if (selectedSet.has(optionValue)) {
        setValues(resolvedValues.filter((valueItem) => valueItem !== optionValue))
        return
      }

      setValues([...resolvedValues, optionValue])
    },
    [resolvedValues, selectedSet, setValues]
  )

  const removeValue = React.useCallback(
    (optionValue: string) => {
      setValues(resolvedValues.filter((valueItem) => valueItem !== optionValue))
    },
    [resolvedValues, setValues]
  )

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Backspace") {
        return
      }

      if (query.length > 0 || resolvedValues.length === 0) {
        return
      }

      const lastValue = resolvedValues[resolvedValues.length - 1]
      if (!lastValue) {
        return
      }

      removeValue(lastValue)
    },
    [query.length, removeValue, resolvedValues]
  )

  return (
    <Popover open={isOpen} onOpenChange={setOpenState}>
      <PopoverTrigger asChild>
        <div
          className={cn("cursor-text", className)}
          onClick={() => {
            if (!isOpen) {
              setOpenState(true)
            }
          }}
        >
          <ComboboxField
            state={visualState}
            disabled={disabled}
            content={
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                {selectedOptions.map((option) => (
                  <Tag
                    key={option.value}
                    type="button"
                    size="sm"
                    tagVariant="secondary"
                    scheme="neutral"
                    className="h-7 rounded-[8px] px-2 text-sm"
                    icon={<X className="size-3.5" />}
                    disabled={disabled}
                    onClick={(event) => {
                      event.stopPropagation()
                      removeValue(option.value)
                    }}
                  >
                    {option.label}
                  </Tag>
                ))}
                <input
                  id={inputId}
                  type="text"
                  value={query}
                  disabled={disabled}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    if (!isOpen) {
                      setOpenState(true)
                    }
                  }}
                  onFocus={() => {
                    if (!isOpen) {
                      setOpenState(true)
                    }
                  }}
                  onKeyDown={handleInputKeyDown}
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                  aria-controls={listboxId}
                  aria-invalid={invalid || undefined}
                  aria-disabled={disabled || undefined}
                  aria-autocomplete="list"
                  aria-label={placeholder}
                  placeholder={selectedOptions.length === 0 ? placeholder : undefined}
                  className="h-6 min-w-24 flex-1 bg-transparent text-base leading-[1.4] text-inherit outline-none placeholder:text-[#757575]"
                />
              </div>
            }
          />
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className={cn("w-[320px] p-2", popoverClassName)}>
        <Command>
          <CommandList id={listboxId} role="listbox" aria-multiselectable="true" aria-labelledby={inputId}>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {showGrouped ? (
              groupedOptions.map((group, groupIndex) => (
                <React.Fragment key={group.name ?? `group-${groupIndex}`}>
                  <CommandGroup heading={group.name}>
                    {group.items.map((option) => {
                      const selected = selectedSet.has(option.value)
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          role="option"
                          aria-selected={selected}
                          disabled={option.disabled || disabled}
                          onSelect={() => {
                            if (disabled || option.disabled) {
                              return
                            }
                            toggleValue(option.value)
                          }}
                        >
                          <span className="flex min-w-0 flex-1 items-center gap-2">
                            {option.icon ? <span className="flex size-5 shrink-0 items-center justify-center">{option.icon}</span> : null}
                            <span className="truncate">{option.label}</span>
                          </span>
                          {selected ? <Check className="size-4 shrink-0" /> : null}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                  {groupIndex < groupedOptions.length - 1 ? <CommandSeparator /> : null}
                </React.Fragment>
              ))
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const selected = selectedSet.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      role="option"
                      aria-selected={selected}
                      disabled={option.disabled || disabled}
                      onSelect={() => {
                        if (disabled || option.disabled) {
                          return
                        }
                        toggleValue(option.value)
                      }}
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        {option.icon ? <span className="flex size-5 shrink-0 items-center justify-center">{option.icon}</span> : null}
                        <span className="truncate">{option.label}</span>
                      </span>
                      {selected ? <Check className="size-4 shrink-0" /> : null}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

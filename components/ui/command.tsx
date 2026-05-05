"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>): React.JSX.Element {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn("flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-white text-[#1E1E1E]", className)}
      {...props}
    />
  )
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>): React.JSX.Element {
  return (
    <div className="flex h-10 items-center gap-2 px-3" data-slot="command-input-wrapper">
      <Search className="size-4 text-[#757575]" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn("h-8 w-full bg-transparent text-base leading-[1.4] outline-none placeholder:text-[#757575]", className)}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): React.JSX.Element {
  return <CommandPrimitive.List data-slot="command-list" className={cn("max-h-[240px] overflow-y-auto p-2", className)} {...props} />
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): React.JSX.Element {
  return <CommandPrimitive.Group data-slot="command-group" className={cn("px-0", className)} {...props} />
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>): React.JSX.Element {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn("my-2 h-px bg-[#D9D9D9]", className)} {...props} />
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): React.JSX.Element {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "flex cursor-pointer items-center rounded-[8px] px-2 py-2 text-base leading-[1.4] text-[#1E1E1E] outline-none data-[selected=true]:bg-black/5 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-[#757575] data-[disabled=true]:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>): React.JSX.Element {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("px-3 py-2 text-sm text-[#757575]", className)}
      {...props}
    />
  )
}

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator }

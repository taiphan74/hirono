"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu"

/* ============================================================
 * WorkspaceCard.MenuItem
 * ============================================================ */
type WorkspaceCardMenuItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  inset?: boolean
}

const WorkspaceCardMenuItem = React.forwardRef<HTMLDivElement, WorkspaceCardMenuItemProps>(
  ({ className, children, ...props }, ref) => (
    <ContextMenuItem
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "flex h-[38px] w-full min-w-[140px] max-w-[300px] cursor-pointer items-center rounded-md bg-white px-2 text-base font-normal leading-[140%] text-[#111316] hover:bg-gray-50 focus:bg-gray-50 focus:text-[#111316]",
        className
      )}
      {...props}
    >
      {children}
    </ContextMenuItem>
  )
)
WorkspaceCardMenuItem.displayName = "WorkspaceCard.MenuItem"

/* ============================================================
 * WorkspaceCard.MenuSeparator
 * ============================================================ */
const WorkspaceCardMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ContextMenuSeparator
    ref={ref as React.Ref<HTMLDivElement>}
    className={cn("h-px w-[256px] bg-[#D5D8DD]", className)}
    {...props}
  />
))
WorkspaceCardMenuSeparator.displayName = "WorkspaceCard.MenuSeparator"

/* ============================================================
 * WorkspaceCard.MenuSubTrigger
 * ============================================================ */
type WorkspaceCardMenuSubTriggerProps = React.ComponentProps<typeof ContextMenuSubTrigger>

function WorkspaceCardMenuSubTrigger({ className, children, ...props }: WorkspaceCardMenuSubTriggerProps) {
  return (
    <ContextMenuSubTrigger
      className={cn(
        "flex h-[38px] w-full min-w-[140px] max-w-[300px] cursor-pointer items-center gap-1 rounded-md bg-white px-2 text-base font-normal leading-[140%] text-[#111316] hover:bg-gray-50 focus:bg-gray-50 focus:text-[#111316] data-[state=open]:bg-gray-50",
        className
      )}
      {...props}
    >
      {children}
    </ContextMenuSubTrigger>
  )
}

/* ============================================================
 * WorkspaceCard.MenuSubContent
 * ============================================================ */
type WorkspaceCardMenuSubContentProps = React.ComponentProps<typeof ContextMenuSubContent>

function WorkspaceCardMenuSubContent({ className, children, ...props }: WorkspaceCardMenuSubContentProps) {
  return (
    <ContextMenuSubContent
      className={cn(
        "w-[260px] max-w-[320px] rounded-lg border border-[#D5D8DD] bg-white py-1 pr-1 pl-0 shadow-[0px_1px_4px_rgba(12,12,13,0.05),0px_1px_4px_rgba(12,12,13,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </ContextMenuSubContent>
  )
}

/* ============================================================
 * WorkspaceCard.MenuSub
 * ============================================================ */
type WorkspaceCardMenuSubProps = React.ComponentProps<typeof ContextMenuSub>

function WorkspaceCardMenuSub({ children, ...props }: WorkspaceCardMenuSubProps) {
  return <ContextMenuSub {...props}>{children}</ContextMenuSub>
}

export {
  WorkspaceCardMenuItem,
  WorkspaceCardMenuSeparator,
  WorkspaceCardMenuSubTrigger,
  WorkspaceCardMenuSubContent,
  WorkspaceCardMenuSub,
}
export type {
  WorkspaceCardMenuItemProps,
  WorkspaceCardMenuSubTriggerProps,
  WorkspaceCardMenuSubContentProps,
  WorkspaceCardMenuSubProps,
}

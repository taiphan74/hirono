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
 * Item trong context menu: 248×38px, padding 8px,
 * Inter 16px regular, color #111316, rounded 4px,
 * hover bg-gray-50.
 * ============================================================ */
type WorkspaceCardMenuItemProps = React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean
}

const WorkspaceCardMenuItem = React.forwardRef<HTMLDivElement, WorkspaceCardMenuItemProps>(
  ({ className, children, ...props }, ref) => (
    <ContextMenuItem
      ref={ref as any}
      className={cn(
        "flex h-[38px] w-full min-w-[140px] max-w-[300px] cursor-pointer items-center rounded-md bg-white px-2 text-base font-normal leading-[140%] text-[#111316] hover:bg-gray-50 focus:bg-gray-50 focus:text-[#111316]",
        className
      )}
      {...(props as any)}
    >
      {children}
    </ContextMenuItem>
  )
)
WorkspaceCardMenuItem.displayName = "WorkspaceCard.MenuItem"

/* ============================================================
 * WorkspaceCard.MenuSeparator
 * Đường kẻ ngang: 256px, 1px solid #D5D8DD
 * ============================================================ */
const WorkspaceCardMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ContextMenuSeparator
    ref={ref as any}
    className={cn("h-px w-[256px] bg-[#D5D8DD]", className)}
    {...(props as any)}
  />
))
WorkspaceCardMenuSeparator.displayName = "WorkspaceCard.MenuSeparator"

/* ============================================================
 * WorkspaceCard.MenuSubTrigger
 * Trigger mở sub menu: 248×38px, padding 8px,
 * Inter 16px regular, #111316, chevron-right icon.
 * ============================================================ */
type WorkspaceCardMenuSubTriggerProps = React.HTMLAttributes<HTMLDivElement>

const WorkspaceCardMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  WorkspaceCardMenuSubTriggerProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuSubTrigger
    ref={ref as any}
    className={cn(
      "flex h-[38px] w-full min-w-[140px] max-w-[300px] cursor-pointer items-center gap-1 rounded-md bg-white px-2 text-base font-normal leading-[140%] text-[#111316] hover:bg-gray-50 focus:bg-gray-50 focus:text-[#111316] data-[state=open]:bg-gray-50",
      className
    )}
    {...(props as any)}
  >
    {children}
  </ContextMenuSubTrigger>
))
WorkspaceCardMenuSubTrigger.displayName = "WorkspaceCard.MenuSubTrigger"

/* ============================================================
 * WorkspaceCard.MenuSubContent
 * Nội dung sub menu: cùng style như menu chính,
 * nhưng render qua ContextMenuSubContent của Radix.
 * ============================================================ */
type WorkspaceCardMenuSubContentProps = React.HTMLAttributes<HTMLDivElement>

const WorkspaceCardMenuSubContent = React.forwardRef<
  HTMLDivElement,
  WorkspaceCardMenuSubContentProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuSubContent
    ref={ref as any}
    className={cn(
      "w-[260px] max-w-[320px] rounded-lg border border-[#D5D8DD] bg-white py-1 pr-1 pl-0 shadow-[0px_1px_4px_rgba(12,12,13,0.05),0px_1px_4px_rgba(12,12,13,0.1)]",
      className
    )}
    {...(props as any)}
  >
    {children}
  </ContextMenuSubContent>
))
WorkspaceCardMenuSubContent.displayName = "WorkspaceCard.MenuSubContent"

/* ============================================================
 * WorkspaceCard.MenuSub
 * Wrapper cho ContextMenuSub của Radix.
 * ============================================================ */
type WorkspaceCardMenuSubProps = React.HTMLAttributes<HTMLDivElement>

const WorkspaceCardMenuSub = React.forwardRef<
  HTMLDivElement,
  WorkspaceCardMenuSubProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuSub
    ref={ref as any}
    {...(props as any)}
  >
    {children}
  </ContextMenuSub>
))
WorkspaceCardMenuSub.displayName = "WorkspaceCard.MenuSub"

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
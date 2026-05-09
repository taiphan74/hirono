"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type WorkspaceCardTextGroupProps = React.HTMLAttributes<HTMLDivElement>

const WorkspaceCardTextGroup = React.forwardRef<HTMLDivElement, WorkspaceCardTextGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-1 flex-col items-start",
        className
      )}
      {...props}
    />
  )
)
WorkspaceCardTextGroup.displayName = "WorkspaceCard.TextGroup"

type WorkspaceCardTitleProps = React.HTMLAttributes<HTMLSpanElement>

const WorkspaceCardTitle = React.forwardRef<HTMLSpanElement, WorkspaceCardTitleProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "block w-full text-base font-normal leading-[140%] text-[#111316]",
        className
      )}
      {...props}
    />
  )
)
WorkspaceCardTitle.displayName = "WorkspaceCard.Title"

type WorkspaceCardDescriptionProps = React.HTMLAttributes<HTMLSpanElement>

const WorkspaceCardDescription = React.forwardRef<HTMLSpanElement, WorkspaceCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "block w-full text-base font-normal leading-[140%] text-[#556070]",
        className
      )}
      {...props}
    />
  )
)
WorkspaceCardDescription.displayName = "WorkspaceCard.Description"

export { WorkspaceCardTextGroup, WorkspaceCardTitle, WorkspaceCardDescription }
export type { WorkspaceCardTextGroupProps, WorkspaceCardTitleProps, WorkspaceCardDescriptionProps }
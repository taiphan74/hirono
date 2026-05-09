"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type WorkspaceCardInfoProps = React.HTMLAttributes<HTMLDivElement>

const WorkspaceCardInfo = React.forwardRef<HTMLDivElement, WorkspaceCardInfoProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-row items-center gap-2.5 self-stretch",
        className
      )}
      {...props}
    />
  )
)
WorkspaceCardInfo.displayName = "WorkspaceCard.Info"

export { WorkspaceCardInfo }
export type { WorkspaceCardInfoProps }
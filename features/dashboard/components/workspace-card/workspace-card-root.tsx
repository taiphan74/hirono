"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

type WorkspaceCardRootProps = React.HTMLAttributes<HTMLDivElement> & {
  menu?: React.ReactNode
}

const WorkspaceCardRoot = React.forwardRef<HTMLDivElement, WorkspaceCardRootProps>(
  ({ className, children, menu, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col items-start gap-2.5 rounded-lg border border-[#D5D8DD] bg-white p-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )

    if (!menu) {
      return content
    }

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>{content}</ContextMenuTrigger>
        <ContextMenuContent className="w-[260px] max-w-[320px] rounded-lg border border-[#D5D8DD] bg-white p-1 shadow-[0px_1px_4px_rgba(12,12,13,0.05),0px_1px_4px_rgba(12,12,13,0.1)]">
          {menu}
        </ContextMenuContent>
      </ContextMenu>
    )
  }
)
WorkspaceCardRoot.displayName = "WorkspaceCard.Root"

export { WorkspaceCardRoot }
export type { WorkspaceCardRootProps }
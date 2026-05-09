"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PenTool } from "lucide-react"

type WorkspaceCardIconBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
}

const WorkspaceCardIconBox = React.forwardRef<HTMLDivElement, WorkspaceCardIconBoxProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#5036EF] p-2",
          className
        )}
        {...props}
      >
        {icon ? (
          <span className="size-6 text-white [&_svg]:size-6 [&_svg]:text-white">
            {icon}
          </span>
        ) : (
          <PenTool className="size-6 rotate-270 text-white" />
        )}
      </div>
    )
  }
)
WorkspaceCardIconBox.displayName = "WorkspaceCard.IconBox"

export { WorkspaceCardIconBox, PenTool as DesignNibIcon }
export type { WorkspaceCardIconBoxProps }
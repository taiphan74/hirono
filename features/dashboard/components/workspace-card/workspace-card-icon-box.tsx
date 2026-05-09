"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PenTool, FileText, Presentation } from "lucide-react"

export type WorkspaceCardType = "design" | "note" | "present"

type WorkspaceCardIconBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
  type?: WorkspaceCardType
}

const typeConfig: Record<WorkspaceCardType, { bg: string; Icon: React.ComponentType<{ className?: string }> }> = {
  design: { bg: "bg-[#5036EF]", Icon: PenTool },
  note: { bg: "bg-[#4F558F]", Icon: FileText },
  present: { bg: "bg-[#D357FF]", Icon: Presentation },
}

const WorkspaceCardIconBox = React.forwardRef<HTMLDivElement, WorkspaceCardIconBoxProps>(
  ({ className, icon, type, ...props }, ref) => {
    const config = type ? typeConfig[type] : typeConfig.design

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-10 w-10 flex-none items-center justify-center rounded-lg p-2",
          config.bg,
          className
        )}
        {...props}
      >
        {icon ? (
          <span className="size-6 text-white [&_svg]:size-6 [&_svg]:text-white">
            {icon}
          </span>
        ) : (
          <config.Icon className={cn("size-6 text-white", type === "design" && "rotate-270")} />
        )}
      </div>
    )
  }
)
WorkspaceCardIconBox.displayName = "WorkspaceCard.IconBox"

export { WorkspaceCardIconBox, PenTool as DesignNibIcon }
export type { WorkspaceCardIconBoxProps }
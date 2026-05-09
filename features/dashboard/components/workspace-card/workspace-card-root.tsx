"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

type WorkspaceCardRootProps = React.HTMLAttributes<HTMLDivElement> & {
  menu?: React.ReactNode
  href?: string
}

const WorkspaceCardRoot = React.forwardRef<HTMLDivElement, WorkspaceCardRootProps>(
  ({ className, children, menu, href, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col items-start gap-2.5 rounded-lg border border-[#D5D8DD] bg-white p-3",
          href && "cursor-pointer hover:border-[#B0B0B0] transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )

    if (!menu && !href) {
      return content
    }

    const linked = href ? (
      <Link href={href} className="block">
        {content}
      </Link>
    ) : (
      content
    )

    if (!menu) {
      return linked
    }

    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>{linked}</ContextMenuTrigger>
        <ContextMenuContent className="w-[260px] max-w-[320px] rounded-lg border border-[#D5D8DD] bg-white py-1 pr-1 pl-0 shadow-[0px_1px_4px_rgba(12,12,13,0.05),0px_1px_4px_rgba(12,12,13,0.1)]">
          {menu}
        </ContextMenuContent>
      </ContextMenu>
    )
  }
)
WorkspaceCardRoot.displayName = "WorkspaceCard.Root"

export { WorkspaceCardRoot }
export type { WorkspaceCardRootProps }
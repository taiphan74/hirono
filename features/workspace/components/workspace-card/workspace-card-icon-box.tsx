"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function DesignNibIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-6", className)}
      aria-hidden="true"
    >
      <path
        d="M4.93 19.07C3.12 17.26 3.12 14.32 4.93 12.51L16.31 1.13C17.13 0.31 18.46 0.31 19.28 1.13L22.87 4.72C23.69 5.54 23.69 6.87 22.87 7.69L11.49 19.07C9.68 20.88 6.74 20.88 4.93 19.07Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.31 1.13L22.87 7.69"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type WorkspaceCardIconBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode
}

const WorkspaceCardIconBox = React.forwardRef<HTMLDivElement, WorkspaceCardIconBoxProps>(
  ({ className, icon, ...props }, ref) => (
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
        <DesignNibIcon />
      )}
    </div>
  )
)
WorkspaceCardIconBox.displayName = "WorkspaceCard.IconBox"

export { WorkspaceCardIconBox, DesignNibIcon }
export type { WorkspaceCardIconBoxProps }
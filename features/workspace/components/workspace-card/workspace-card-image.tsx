"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type WorkspaceCardImageProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string
  alt?: string
}

const WorkspaceCardImage = React.forwardRef<HTMLDivElement, WorkspaceCardImageProps>(
  ({ className, src, alt = "Workspace thumbnail", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-[151px] w-full self-stretch overflow-hidden rounded-lg",
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 h-full w-full bg-gray-100" />
      )}
      {children}
    </div>
  )
)
WorkspaceCardImage.displayName = "WorkspaceCard.Image"

export { WorkspaceCardImage }
export type { WorkspaceCardImageProps }
"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/components/ui/icon-button"

type WorkspaceCardFavoriteProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

const WorkspaceCardFavorite = React.forwardRef<HTMLButtonElement, WorkspaceCardFavoriteProps>(
  ({ className, active = false, ...props }, ref) => (
    <IconButton
      ref={ref}
      type="button"
      size="small"
      variant="ghost"
      className={cn(
        "absolute right-2 top-2 border-[#D5D8DD] bg-white hover:bg-gray-50",
        className
      )}
      {...props}
    >
      <Star
        className={cn(
          "size-5",
          active ? "fill-[#FFCB00] text-[#FFCB00]" : "text-gray-400"
        )}
      />
    </IconButton>
  )
)
WorkspaceCardFavorite.displayName = "WorkspaceCard.Favorite"

export { WorkspaceCardFavorite }
export type { WorkspaceCardFavoriteProps }
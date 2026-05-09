"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Send,
  StickyNote,
  Square,
  Type,
  ScanText,
  MessageCircle,
  Grid2x2Plus,
} from "lucide-react"

const tools = [
  { icon: Send, variant: "primary" as const },
  { icon: StickyNote, variant: "secondarySubtle" as const },
  { icon: Square, variant: "secondarySubtle" as const },
  { icon: Type, variant: "secondarySubtle" as const },
  { icon: ScanText, variant: "secondarySubtle" as const },
  { icon: MessageCircle, variant: "secondarySubtle" as const },
  { icon: Grid2x2Plus, variant: "secondarySubtle" as const },
]

export function Toolbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 z-50 -translate-x-1/2",
        "flex items-center gap-[10px]",
        "rounded-2xl bg-white px-8 py-4 shadow-xl",
        className
      )}
    >
      {tools.map((tool, i) => (
        <Button
          key={i}
          variant={tool.variant}
          size="sm"
          className="size-9 p-0"
        >
          <tool.icon className="size-5" />
        </Button>
      ))}
    </div>
  )
}

"use client"

import { useReactFlow } from "@xyflow/react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

export function CanvasControls() {
  const { zoomIn, zoomOut } = useReactFlow()

  return (
    <div className="flex items-center gap-1 rounded-md border bg-white p-1 shadow-sm">
      <Button
        type="button"
        variant="subtle"
        size="xs"
        className="h-[22px] w-[22px] rounded-sm p-0"
        onClick={() => zoomOut({ duration: 200 })}
      >
        <Minus className="size-3" />
      </Button>

      <Button
        type="button"
        variant="subtle"
        size="xs"
        className="h-[22px] w-[22px] rounded-sm p-0"
        onClick={() => zoomIn({ duration: 200 })}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  )
}

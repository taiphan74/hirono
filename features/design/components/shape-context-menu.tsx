"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  RectangleHorizontal,
  Square,
  Circle,
  Diamond,
  Triangle,
  Hexagon,
} from "lucide-react"
import { useDesignToolStore } from "@/stores/dialog-store"
import type { ShapeType } from "./shape-node"

export type ShapeId = ShapeType

const shapeItems: {
  id: ShapeId
  label: string
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: "rect", label: "Rectangle", Icon: RectangleHorizontal },
  { id: "rounded", label: "Rounded", Icon: Square },
  { id: "circle", label: "Circle", Icon: Circle },
  { id: "diamond", label: "Diamond", Icon: Diamond },
  { id: "triangle", label: "Triangle", Icon: Triangle },
  { id: "hexagon", label: "Hexagon", Icon: Hexagon },
]

export { shapeItems }

interface ShapeContextMenuProps {
  children: React.ReactNode
}

export function ShapeContextMenu({ children }: ShapeContextMenuProps) {
  const [open, setOpen] = useState(false)
  const activeTool = useDesignToolStore((s) => s.activeTool)
  const setActiveTool = useDesignToolStore((s) => s.setActiveTool)
  const activeShape = useDesignToolStore((s) => s.activeShape)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" align="center" className="flex min-w-fit items-center gap-1 rounded-2xl border-[#D5D8DD] bg-white px-3 py-2 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]">
        {shapeItems.map((item) => {
          const isActive = activeTool === "shape" && activeShape === item.id
          return (
            <button
              key={item.id}
              type="button"
              className="flex size-9 items-center justify-center rounded-[4px] p-0 hover:bg-[#F5F5F5]"
              onClick={() => {
                setActiveTool("shape")
                useDesignToolStore.getState().setActiveShape(item.id)
                setOpen(false)
              }}
            >
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  isActive ? "bg-[#5036ef]" : "bg-[#111316] opacity-0"
                )}
              />
              <item.Icon
                className={cn(
                  "size-5 shrink-0",
                  isActive ? "text-[#5036ef]" : "text-[#111316]"
                )}
              />
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
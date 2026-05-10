"use client"

import { useEffect, useRef } from "react"
import { NodeResizer, type Node, type NodeProps, type ResizeParams } from "@xyflow/react"
import { cn } from "@/lib/utils"

type TextNodeData = {
  text: string
  autoFocus?: boolean
  onChange?: (id: string, text: string) => void
  onResizeEnd?: (id: string, size: { width: number; height: number }) => void
}

export type TextNodeType = Node<TextNodeData, "textNode">

export function TextNode({ id, data, selected }: NodeProps<TextNodeType>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!data.autoFocus) return
    requestAnimationFrame(() => {
      textareaRef.current?.focus()
      textareaRef.current?.select()
    })
  }, [data.autoFocus])

  return (
    <div
      className={cn(
        "h-full w-full rounded-xl border bg-white shadow-sm",
        selected && "ring-2 ring-violet-500"
      )}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={120}
        minHeight={48}
        color="#7C3AED"
        handleClassName="!size-3 !rounded-sm !border !border-violet-500 !bg-white"
        lineClassName="!border-violet-500"
        onResizeEnd={(_, params: ResizeParams) => {
          data.onResizeEnd?.(id, { width: params.width, height: params.height })
        }}
      />
      <textarea
        ref={textareaRef}
        value={data.text}
        onChange={(e) => data.onChange?.(id, e.target.value)}
        placeholder="Type something..."
        className="nodrag nowheel h-full w-full resize-none rounded-xl bg-transparent p-3 text-base font-medium leading-relaxed outline-none"
      />
    </div>
  )
}
"use client"

import { cn } from "@/lib/utils"
import { NodeResizer, type Node, type NodeProps } from "@xyflow/react"

export type SectionNodeData = {
  name: string
}

export type SectionNodeType = Node<SectionNodeData, "section">

export function SectionNode({ data, selected }: NodeProps<SectionNodeType>) {
  return (
    <div
      className={cn(
        "h-full w-full rounded-xl border border-[#D9D9D9] bg-white p-1 shadow-sm",
        selected && "ring-2 ring-blue-500"
      )}
    >
      <NodeResizer
        isVisible={selected}
        minWidth={240}
        minHeight={160}
        color="#3b82f6"
        lineClassName="!border-blue-500"
        handleClassName="!h-3 !w-3 !rounded-sm !border !border-blue-500 !bg-white"
      />

      <div className="inline-flex items-center justify-center rounded-lg border border-[#D9D9D9] bg-[#f5f6f8] px-3 py-1">
        <p className="whitespace-nowrap text-xs font-semibold leading-[1.4] text-black">
          {data.name}
        </p>
      </div>
    </div>
  )
}
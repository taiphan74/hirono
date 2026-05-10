"use client"

import { useEffect, useState } from "react"
import {
  Handle,
  Position,
  NodeResizer,
  NodeToolbar,
  type Node,
  type NodeProps,
  type ResizeParams,
} from "@xyflow/react"
import { cn } from "@/lib/utils"

export type ShapeType =
  | "rect"
  | "rounded"
  | "circle"
  | "diamond"
  | "triangle"
  | "hexagon"

export type ShapeNodeData = {
  shape: ShapeType
  fill?: string
  stroke?: string
  label?: string
  onChangeShape?: (id: string, shape: ShapeType) => void
  onChangeLabel?: (id: string, label: string) => void
  onCommitLabel?: (id: string, label: string) => void
  onResizeEnd?: (id: string, size: { width: number; height: number }) => void
}

export type ShapeNodeType = Node<ShapeNodeData, "shapeNode">

const shapes: ShapeType[] = [
  "rect",
  "rounded",
  "circle",
  "diamond",
  "triangle",
  "hexagon",
]

function ShapeSvg({
  shape,
  fill = "#ffffff",
  stroke = "#111827",
}: {
  shape: ShapeType
  fill?: string
  stroke?: string
}) {
  switch (shape) {
    case "circle":
      return (
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="46"
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
        />
      )
    case "diamond":
      return (
        <polygon
          points="50,4 96,50 50,96 4,50"
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
        />
      )
    case "triangle":
      return (
        <polygon
          points="50,5 96,95 4,95"
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
        />
      )
    case "hexagon":
      return (
        <polygon
          points="25,6 75,6 98,50 75,94 25,94 2,50"
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
        />
      )
    case "rounded":
      return (
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="14"
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
        />
      )
    default:
      return (
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="2"
          fill={fill}
          stroke={stroke}
          strokeWidth="3"
        />
      )
  }
}

export function ShapeNode({ id, data, selected }: NodeProps<ShapeNodeType>) {
  const [isEditing, setIsEditing] = useState(false)
  const [labelDraft, setLabelDraft] = useState(data.label ?? "")

  useEffect(() => {
    if (!isEditing) {
      setLabelDraft(data.label ?? "")
    }
  }, [data.label, isEditing])

  const commitLabel = () => {
    const nextLabel = labelDraft.trim()
    data.onCommitLabel?.(id, nextLabel)
    setIsEditing(false)
  }

  return (
    <div
      className="relative h-full w-full"
      onDoubleClick={() => {
        setIsEditing(true)
      }}
    >
      <Handle id="top" type="source" position={Position.Top} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="right" type="source" position={Position.Right} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="bottom" type="source" position={Position.Bottom} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="left" type="source" position={Position.Left} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />

      <NodeResizer
        isVisible={selected}
        minWidth={60}
        minHeight={60}
        color="#3b82f6"
        lineClassName="!border-blue-500"
        handleClassName="!h-3 !w-3 !rounded-sm !border !border-blue-500 !bg-white"
        onResizeEnd={(_, params: ResizeParams) => {
          data.onResizeEnd?.(id, {
            width: params.width,
            height: params.height,
          })
        }}
      />

      <NodeToolbar
        isVisible={selected}
        position={Position.Top}
        className="flex gap-1 rounded-xl border bg-white p-1 shadow-lg"
      >
        {shapes.map((shape) => (
          <button
            key={shape}
            onClick={() => data.onChangeShape?.(id, shape)}
            className={cn(
              "nodrag rounded-md px-2 py-1 text-xs hover:bg-muted",
              data.shape === shape && "bg-blue-600 text-white"
            )}
          >
            {shape}
          </button>
        ))}
      </NodeToolbar>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <ShapeSvg shape={data.shape} fill={data.fill} stroke={data.stroke} />
      </svg>

      {isEditing ? (
        <div className="absolute inset-0 flex items-center justify-center px-3">
          <textarea
            className="nodrag nowheel w-full resize-none rounded-md border border-[#D5D8DD] bg-white px-2 py-1 text-center text-sm font-medium outline-none"
            value={labelDraft}
            autoFocus
            rows={2}
            onChange={(e) => {
              const value = e.target.value
              setLabelDraft(value)
              data.onChangeLabel?.(id, value)
            }}
            onBlur={commitLabel}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                commitLabel()
              }
            }}
          />
        </div>
      ) : (
        !!data.label && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center text-sm font-medium">
            {data.label}
          </div>
        )
      )}
    </div>
  )
}
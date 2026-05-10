"use client"

import { useEffect, useRef, useState } from "react"
import { Handle, Position, NodeResizer, type Node, type NodeProps, type ResizeParams } from "@xyflow/react"
import { cn } from "@/lib/utils"

export type StickyNoteColor = "pink" | "yellow" | "green" | "blue" | "purple" | "orange"

const colorMap: Record<StickyNoteColor, { bg: string; border: string; textAccent: string }> = {
  pink: { bg: "bg-[#ffc0ee]", border: "border-[#e33283]", textAccent: "text-[#e33283]" },
  yellow: { bg: "bg-[#fef3c7]", border: "border-[#d97706]", textAccent: "text-[#d97706]" },
  green: { bg: "bg-[#dcfce7]", border: "border-[#16a34a]", textAccent: "text-[#16a34a]" },
  blue: { bg: "bg-[#dbeafe]", border: "border-[#2563eb]", textAccent: "text-[#2563eb]" },
  purple: { bg: "bg-[#ede9fe]", border: "border-[#7c3aed]", textAccent: "text-[#7c3aed]" },
  orange: { bg: "bg-[#fed7aa]", border: "border-[#ea580c]", textAccent: "text-[#ea580c]" },
}

const colorOptions = Object.keys(colorMap) as StickyNoteColor[]

export type StickyNoteNodeData = {
  text: string
  author: string
  color: StickyNoteColor
  autoFocus?: boolean
  onChangeText?: (id: string, text: string) => void
  onCommitText?: (id: string, text: string) => void
  onChangeColor?: (id: string, color: StickyNoteColor) => void
  onResizeEnd?: (id: string, size: { width: number; height: number }) => void
}

export type StickyNoteNodeType = Node<StickyNoteNodeData, "stickyNote">

export function StickyNoteNode({ id, data, selected }: NodeProps<StickyNoteNodeType>) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(data.text)
  const [colorOpen, setColorOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // When not editing, display prop text; when editing, use local draft
  const displayText = isEditing ? draft : data.text

  useEffect(() => {
    if (!data.autoFocus) return
    requestAnimationFrame(() => {
      textareaRef.current?.focus()
      textareaRef.current?.select()
    })
  }, [data.autoFocus])

  const commitText = () => {
    const next = draft.trim()
    data.onCommitText?.(id, next)
    setIsEditing(false)
  }

  const colors = colorMap[data.color]

  return (
    <div
      className={cn(
        "h-full w-full rounded-2xl border-2 p-4 shadow-sm flex flex-col gap-2 overflow-hidden",
        colors.bg,
        colors.border,
        selected && "ring-2 ring-blue-500"
      )}
      onDoubleClick={() => {
        setDraft(data.text)
        setIsEditing(true)
      }}
    >
      <Handle id="top" type="source" position={Position.Top} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="right" type="source" position={Position.Right} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="bottom" type="source" position={Position.Bottom} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />
      <Handle id="left" type="source" position={Position.Left} className="!z-20 !size-3 !border-2 !border-blue-500 !bg-white" isConnectable />

      <NodeResizer
        isVisible={selected}
        minWidth={180}
        minHeight={120}
        color="#3b82f6"
        lineClassName="!border-blue-500"
        handleClassName="!h-3 !w-3 !rounded-sm !border !border-blue-500 !bg-white"
        onResizeEnd={(_, params: ResizeParams) => {
          data.onResizeEnd?.(id, { width: params.width, height: params.height })
        }}
      />

      {selected && (
        <div className="nodrag absolute left-1/2 -translate-x-1/2 flex translate-y-[-200%] flex-col items-center gap-1">
          {colorOpen && (
            <div className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-2 py-1.5 shadow-lg">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    data.onChangeColor?.(id, c)
                    setColorOpen(false)
                  }}
                  className={cn(
                    "size-6 rounded-full border border-[#D1D5DB] transition-transform hover:scale-110",
                    data.color === c && "ring-2 ring-[#5036ef] ring-offset-2"
                  )}
                  style={{ backgroundColor: getBgHex(c) }}
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-2 py-1.5 shadow-lg">
            <button
              type="button"
              onClick={() => setColorOpen((v) => !v)}
              className={cn(
                "flex cursor-pointer items-center gap-0.5 rounded-md p-1 hover:bg-[#F5F5F5]",
                colorOpen && "bg-[#F5F5F5]"
              )}
            >
              <span
                className="size-4 rounded-full border border-[#D1D5DB]"
                style={{ backgroundColor: getBgHex(data.color) }}
              />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="nodrag nowheel w-full h-full resize-none bg-transparent text-[15px] leading-[1.4] text-[#111316] outline-none placeholder:text-[#9CA3AF]"
            value={displayText}
            autoFocus
            onChange={(e) => {
              setDraft(e.target.value)
              data.onChangeText?.(id, e.target.value)
            }}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault()
                commitText()
              }
            }}
            placeholder="Type something..."
          />
        ) : (
          <p className="whitespace-pre-wrap text-[15px] leading-[1.4] text-[#111316] overflow-hidden">
            {data.text || (
              <span className="text-[#9CA3AF] italic">Type something...</span>
            )}
          </p>
        )}
      </div>

      <p className="text-[13px] leading-[1.4] text-[#556070] shrink-0">
        {data.author}
      </p>
    </div>
  )
}

function getBgHex(color: StickyNoteColor): string {
  const map: Record<StickyNoteColor, string> = {
    pink: "#ffc0ee",
    yellow: "#fef3c7",
    green: "#dcfce7",
    blue: "#dbeafe",
    purple: "#ede9fe",
    orange: "#fed7aa",
  }
  return map[color]
}
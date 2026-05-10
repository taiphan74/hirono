"use client"

import { useState } from "react"
import type { ChatMode } from "@/features/design/services/chat.service"

const MODES: { id: ChatMode; label: string; description: string }[] = [
  { id: "FEW", label: "Few", description: "Search-based answers" },
  { id: "ONLY", label: "Only", description: "Direct answers" },
]

export { type ChatMode }

export function ModeSelector({
  value = "FEW",
  onChange,
}: {
  value?: ChatMode
  onChange?: (mode: ChatMode) => void
}) {
  const [mode, setMode] = useState<ChatMode>(value)

  return (
    <div className="flex h-10 items-center rounded-lg border border-[#22262D] bg-white p-0.5">
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          className={`flex h-9 items-center rounded-md px-3 text-[14px] font-medium leading-[1.4] transition-colors ${
            mode === m.id
              ? "bg-[#5036EF] text-white"
              : "text-[#111316] hover:bg-[#F5F5F5]"
          }`}
          onClick={() => {
            setMode(m.id)
            onChange?.(m.id)
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
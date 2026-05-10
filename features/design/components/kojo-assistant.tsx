"use client"

import { Columns2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Thread } from "./assistant/thread"

export function KojoAssistant() {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <div className="pointer-events-auto absolute right-8 top-[72px] z-50 flex items-center justify-between gap-3 rounded-lg border border-[#D5D8DD] bg-white px-4 py-3 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]">
        <div className="flex flex-col leading-[1.4]">
          <span className="text-base font-semibold text-black">KOJO Assistant</span>
          <span className="text-sm text-[#4B5563]">Your mind powerful tool AI</span>
        </div>
        <Button
          variant="secondaryNeutral"
          size="xs"
          className="size-9 shrink-0 p-0"
          onClick={() => setOpen(true)}
        >
          <Columns2 className="size-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="pointer-events-auto absolute right-8 top-[72px] z-50 flex w-[453px] flex-col rounded-2xl border border-[#D5D8DD] bg-[#F5F6F8] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]">
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-2xl border-b border-[#D5D8DD] bg-white px-4 py-3">
        <div className="flex items-center gap-1">
          <button type="button" className="flex size-8 items-center justify-center rounded-lg hover:bg-[#F5F5F5]">
            <Menu className="size-[22px] text-[#4B5563]" />
          </button>
          <div className="flex flex-col leading-[1.4]">
            <span className="text-base font-semibold text-black">KOJO Assistant</span>
            <span className="text-sm text-[#4B5563]">Your mind powerful tool AI</span>
          </div>
        </div>
        <button
          type="button"
          className="flex size-8 items-center justify-center rounded-lg hover:bg-[#F5F5F5]"
          onClick={() => setOpen(false)}
        >
          <X className="size-5 text-[#4B5563]" />
        </button>
      </div>

      {/* Thread with assistant-ui primitives */}
      <Thread />
    </div>
  )
}
"use client"

import { ComposerPrimitive } from "@assistant-ui/react"
import { ArrowUp } from "lucide-react"
import { ModeSelector } from "./mode-selector"
import { useChatMode } from "./runtime"

export function Composer() {
  const { mode, setMode } = useChatMode()

  return (
    <div className="rounded-b-2xl border-t border-[#D5D8DD] bg-white px-4 py-4">
      <div className="flex flex-col gap-4">
        <ComposerPrimitive.Root className="flex items-start rounded-lg border border-[#D5D8DD] bg-white px-4 py-3">
          <ComposerPrimitive.Input
            className="min-h-[24px] w-full resize-none bg-transparent text-[16px] leading-[1.4] text-[#111316] outline-none placeholder:text-[#556070]"
            placeholder="Send your questions to Kojo"
          />
        </ComposerPrimitive.Root>

        <div className="flex items-center justify-between">
          <ModeSelector value={mode} onChange={setMode} />
          <ComposerPrimitive.Send className="flex size-9 items-center justify-center rounded-lg bg-[#5036EF] hover:bg-[#4530d4] disabled:opacity-50">
            <ArrowUp className="size-5 text-white" />
          </ComposerPrimitive.Send>
        </div>
      </div>
    </div>
  )
}
"use client"

import { MessagePrimitive } from "@assistant-ui/react"

export function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex flex-col gap-2 rounded-[10px] border border-[#5036EF]/20 bg-[#F0EEFF] p-3">
      <div className="text-[16px] leading-[1.4] text-[#111316]">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  )
}
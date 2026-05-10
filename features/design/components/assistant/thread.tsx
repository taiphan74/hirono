"use client"

import { ThreadPrimitive } from "@assistant-ui/react"
import { AssistantMessage } from "./assistant-message"
import { UserMessage } from "./user-message"
import { Composer } from "./composer"

export function Thread() {
  return (
    <ThreadPrimitive.Root className="flex flex-1 flex-col overflow-hidden">
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto p-4">
        <ThreadPrimitive.Empty>
          <p className="text-[16px] leading-[1.4] text-[#314158]">
            Ask Kojo anything about your design. Sources will appear here.
          </p>
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      <Composer />
    </ThreadPrimitive.Root>
  )
}
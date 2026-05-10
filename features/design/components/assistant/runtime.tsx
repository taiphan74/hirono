"use client"

import { AssistantRuntimeProvider, useLocalRuntime } from "@assistant-ui/react"
import type { ChatModelAdapter } from "@assistant-ui/react"
import { useParams } from "next/navigation"
import { chatService, type ChatMode, type SearchData } from "@/features/design/services/chat.service"
import { createContext, useContext, useState, type ReactNode } from "react"

const ChatModeContext = createContext<{
  mode: ChatMode
  setMode: (mode: ChatMode) => void
}>({ mode: "FEW", setMode: () => {} })

export const useChatMode = () => useContext(ChatModeContext)

const SearchDataContext = createContext<{
  data: SearchData | null
}>({ data: null })

export const useSearchData = () => useContext(SearchDataContext)

function useChatModel(slug: string, onSearchData: (data: SearchData | null) => void): ChatModelAdapter {
  const mode = useChatMode().mode

  return {
    async run({ messages }) {
      const lastMessage = messages[messages.length - 1]
      const text = lastMessage?.content
        ?.filter((c): c is { type: "text"; text: string } => c.type === "text")
        .map((c) => c.text)
        .join("\n") ?? ""

      const res = await chatService.send(slug, { message: text, mode })

      const data = res as unknown as {
        status: string
        data: { message?: string; searchData?: SearchData }
      }

      if (data.status !== "SUCCESS") throw new Error("Chat API error")

      onSearchData(data.data.searchData ?? null)

      return {
        content: [{ type: "text", text: data.data.message ?? "No response" }],
      }
    },
  }
}

function AssistantProviderInner({ children }: { children: ReactNode }) {
  const { slug } = useParams<{ slug: string }>()
  const [mode, setMode] = useState<ChatMode>("FEW")
  const [searchData, setSearchData] = useState<SearchData | null>(null)
  const chatModel = useChatModel(slug, setSearchData)
  const runtime = useLocalRuntime(chatModel)

  return (
    <ChatModeContext.Provider value={{ mode, setMode }}>
      <SearchDataContext.Provider value={{ data: searchData }}>
        <AssistantRuntimeProvider runtime={runtime}>
          {children}
        </AssistantRuntimeProvider>
      </SearchDataContext.Provider>
    </ChatModeContext.Provider>
  )
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  return <AssistantProviderInner>{children}</AssistantProviderInner>
}
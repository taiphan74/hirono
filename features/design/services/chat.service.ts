import api, { type ApiResponse } from "@/lib/api"

export interface SearchResult {
  id: string
  title: string
  url: string
  content: string
  favicon: string
}

export interface SearchData {
  query: string
  results: SearchResult[]
}

export interface ChatResponse {
  type: string
  message: string
  searchData?: SearchData
}

export type ChatMode = "FEW" | "ONLY"

export interface ChatRequest {
  message: string
  mode: ChatMode
}

export const chatService = {
  send(workspaceId: string, payload: ChatRequest) {
    return api.post<ApiResponse<ChatResponse>>(
      `workspaces/${workspaceId}/ai/chat`,
      payload,
    )
  },
}
"use client"

import { MessagePrimitive } from "@assistant-ui/react"
import { Copy, ChevronDown, ChevronUp, Globe } from "lucide-react"
import { useState } from "react"
import { useSearchData } from "./runtime"

export function AssistantMessage() {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const { data: searchData } = useSearchData()

  return (
    <MessagePrimitive.Root className="flex flex-col gap-2 rounded-[10px] border border-[#E2E8F0] bg-white p-3">
      <div className="flex-1 text-[16px] leading-[1.4] text-[#111316]">
        <MessagePrimitive.Content />
      </div>

      <div className="flex items-center justify-between pt-1">
        <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-[#22262D] hover:bg-[#F5F5F5]">
          <Copy className="size-4 text-[#22262D]" />
        </button>

        {searchData && searchData.results.length > 0 && (
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-lg bg-[#5036EF] px-3 py-2 text-sm font-normal text-white hover:bg-[#4530d4]"
            onClick={() => setSourcesOpen((v) => !v)}
          >
            Sources ({searchData.results.length})
            {sourcesOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        )}
      </div>

      {sourcesOpen && searchData && searchData.results.length > 0 && (
        <div className="flex flex-col gap-2 pt-1">
          {searchData.results.map((result) => (
            <div key={result.id} className="flex flex-col gap-1 rounded-lg border border-[#E2E8F0] p-3">
              <div className="flex items-center gap-2">
                {result.favicon ? (
                  <img src={result.favicon} alt="" className="size-4 shrink-0 rounded" />
                ) : (
                  <Globe className="size-4 shrink-0 text-[#4B5563]" />
                )}
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 truncate text-[14px] font-medium leading-[1.4] text-[#5036EF] hover:underline"
                >
                  {result.title}
                </a>
              </div>
              <p className="text-[14px] leading-[1.4] text-[#4B5563] line-clamp-2">
                {result.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </MessagePrimitive.Root>
  )
}
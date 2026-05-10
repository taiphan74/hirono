"use client"

import { Columns2, Menu, Plus, ChevronDown, ArrowUp, X, Check, Copy, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

const AI_MODELS = [
  { id: "chatgpt-opus", name: "Chat GPT opus", icon: "/chatgpt.png" },
  { id: "claude-4.7", name: "Claude 4.7", icon: "/claude.png" },
  { id: "gemini-pro", name: "Gemini Pro", icon: "/gemini.png" },
] as const

type ModelId = typeof AI_MODELS[number]["id"]

function ModelSelector({
  selected,
  onSelect,
}: {
  selected: ModelId
  onSelect: (id: ModelId) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const selectedModel = AI_MODELS.find((m) => m.id === selected)!

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="flex h-10 items-center gap-1 rounded-lg border border-[#22262D] bg-white px-2 py-2 text-[16px] text-[#111316] hover:bg-[#F5F5F5]"
        onClick={() => setOpen((v) => !v)}
      >
        <img src={selectedModel.icon} alt={selectedModel.name} className="size-5 rounded-[6.667px] object-cover" />
        <span>{selectedModel.name}</span>
        <ChevronDown className="size-4" />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-1 w-[200px] rounded-lg border border-[#D5D8DD] bg-white py-1 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]">
          {AI_MODELS.map((model) => (
            <button
              key={model.id}
              type="button"
              className="flex w-full items-center gap-1 rounded px-2 py-2 text-[16px] text-[#111316] hover:bg-[#F5F5F5]"
              onClick={() => { onSelect(model.id); setOpen(false) }}
            >
              <img src={model.icon} alt={model.name} className="size-5 shrink-0 rounded-[6.667px] object-cover" />
              <span className="flex-1 text-left leading-[1.4]">{model.name}</span>
              {model.id === selected && <Check className="size-4 shrink-0 text-[#5036EF]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function KojoAssistant() {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState<ModelId>("chatgpt-opus")

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

  const selectedModel = AI_MODELS.find((m) => m.id === model)!

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

      {/* Messages area */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <p className="text-[16px] leading-[1.4] text-[#314158]">
          Here are 3 sources defining Confirmation Bias. You can drag these directly onto the canvas:
        </p>

        {/* Source cards */}
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-2 rounded-[10px] border border-[#E2E8F0] bg-white p-3">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1.5">
                <div className="size-5 rounded bg-[#22262D]" />
                <span className="text-[16px] font-semibold leading-[1.4] text-[#111316]">Studo cu</span>
              </div>
              <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-white hover:bg-[#F5F5F5]">
                <ArrowUp className="size-4 text-[#4B5563]" />
              </button>
            </div>
            <div className="flex gap-2">
              <p className="flex-1 text-[16px] leading-[1.4] text-[#111316]">
                &ldquo;Confirmation bias is the tendency to search for, interpret, favor, and recall information in a way that confirms one&apos;s prior beliefs.&rdquo; (Nickerson, 1998)
              </p>
              <div className="flex flex-col items-center rounded-lg p-1">
                <div className="w-2 flex-1 rounded-lg bg-[#22262D]" />
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <button type="button" className="flex size-8 items-center justify-center rounded-lg border border-[#22262D] hover:bg-[#F5F5F5]">
                <Copy className="size-4 text-[#22262D]" />
              </button>
              <button type="button" className="flex h-8 items-center gap-2 rounded-lg bg-[#5036EF] px-3 py-2 text-sm font-normal text-white hover:bg-[#4530d4]">
                Make road map
                <StickyNote className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="rounded-b-2xl border-t border-[#D5D8DD] bg-white px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start rounded-lg border border-[#D5D8DD] bg-white px-4 py-3">
            <span className="text-[16px] leading-none text-[#556070]">Send your questions to Kojo</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button type="button" className="flex h-10 items-center gap-2 rounded-lg border border-[#22262D] px-4 py-3 text-[16px] text-[#22262D] hover:bg-[#F5F5F5]">
                <Plus className="size-4" />
                Upload
              </button>
              <ModelSelector selected={model} onSelect={setModel} />
            </div>
            <button type="button" className="flex size-9 items-center justify-center rounded-lg bg-[#5036EF] hover:bg-[#4530d4]">
              <ArrowUp className="size-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
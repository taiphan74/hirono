"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, CornerUpRight } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

interface CommunityTemplate {
  id: string
  title: string
  author: string
  imageSrc?: string
  avatarSrc?: string
}

interface CommunitySectionProps {
  title?: string
  templates?: CommunityTemplate[]
  className?: string
}

const defaultTemplates: CommunityTemplate[] = [
  { id: "1", title: "Fostering Creativity", author: "Taylor Reed" },
  { id: "2", title: "Building Tomorrow's Solutions", author: "Jordan Blake" },
  { id: "3", title: "Crafting New Ideas", author: "Jamie Brooks" },
  { id: "4", title: "Igniting Imagination", author: "Avery Lane" },
  { id: "5", title: "Shaping Future Visions", author: "Sydney Brooks" },
  { id: "6", title: "Designing Breakthrough Concepts", author: "Quinn Morgan" },
  { id: "7", title: "Nurturing Innovative Thinking", author: "Morgan West" },
  { id: "8", title: "Pioneering New Frontiers", author: "Casey Hill" },
  { id: "9", title: "Fostering Creativity", author: "Taylor Reed" },
  { id: "10", title: "Building Tomorrow's Solutions", author: "Jordan Blake" },
  { id: "11", title: "Crafting New Ideas", author: "Jamie Brooks" },
  { id: "12", title: "Igniting Imagination", author: "Avery Lane" },
]

function CommunityCard({ template }: { template: CommunityTemplate }) {
  const initials = template.author
    .split(" ")
    .map((n) => n[0])
    .join("")[0]

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-[#D5D8DD] bg-white p-2">
      <div className="relative h-[172px] w-full overflow-hidden rounded-lg bg-[#E8E9EB]">
        {template.imageSrc ? (
          <img
            src={template.imageSrc}
            alt={template.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#9BA3B0]">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="8" fill="currentColor" opacity="0.15" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            type={template.avatarSrc ? "image" : "initial"}
            src={template.avatarSrc}
            initial={initials}
            size="lg"
            className="bg-[#5036EF] text-sm font-semibold text-white [&_span]:text-sm [&_span]:font-semibold [&_span]:text-white"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-[1.4] text-[#111316]">
              {template.title}
            </p>
            <p className="truncate text-sm leading-[1.4] text-[#556070]">
              by {template.author}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#D5D8DD] bg-white hover:bg-gray-50"
          aria-label="Share"
        >
          <CornerUpRight className="size-5 text-[#556070]" />
        </button>
      </div>
    </div>
  )
}

export function DashboardCommunity({
  title = "Popular templates",
  templates = defaultTemplates,
  className,
}: CommunitySectionProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {["first", "second", "third"].map((_, sectionIndex) => (
        <React.Fragment key={sectionIndex}>
          <div className="flex items-center gap-1 rounded px-2 py-2">
            <p className="flex-1 text-base font-semibold leading-[1.4] text-[#111316] whitespace-nowrap">
              {title}
            </p>
            <ChevronRight className="size-4 text-[#556070]" />
          </div>
          <div className="grid w-full grid-cols-4 gap-4">
            {templates
              .slice(sectionIndex * 4, sectionIndex * 4 + 4)
              .map((template) => (
                <CommunityCard key={template.id} template={template} />
              ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export type { CommunityTemplate, CommunitySectionProps }
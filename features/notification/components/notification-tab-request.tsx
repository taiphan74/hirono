"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, MessageCircle } from "lucide-react"
import type { RequestItem } from "./notification-dropdown"

function DesignNibIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M6.5 19.5L3 21L4.5 17.5L17.5 4.5C17.8 4.2 18.2 4 18.7 4C19.2 4 19.6 4.2 19.9 4.5L20.5 5.1C20.8 5.4 21 5.8 21 6.3C21 6.8 20.8 7.2 20.5 7.5L6.5 19.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 8.5L15.5 11.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function RequestIcon({ type }: { type?: "eye" | "design" | "comment" }) {
  if (type === "eye") return <Eye className="size-5 text-[#111316]" />
  if (type === "design") return <DesignNibIcon />
  if (type === "comment") return <MessageCircle className="size-5 text-[#111316]" />
  return null
}

function RequestItemRow({ item }: { item: RequestItem }) {
  return (
    <div className="flex items-center gap-3 py-2 rounded-lg">
      <Avatar size="md" type="image" src={item.avatarSrc} />
      <div className="flex-1 min-w-0 flex flex-col gap-0">
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold text-black leading-[140%] whitespace-nowrap">{item.name}</p>
          <div className="flex items-center gap-1 p-1 rounded-lg">
            <RequestIcon type={item.icon} />
            <p className="text-base font-normal text-[#111316] leading-[140%] whitespace-nowrap">{item.action}</p>
          </div>
        </div>
        <p className="text-base font-normal text-[#556070] leading-[140%]">{item.email}</p>
      </div>
      <Button variant="primary" size="sm">Approve</Button>
    </div>
  )
}

function RequestGroupHeader({ project, date }: { project: string; date: string }) {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-base font-semibold text-black leading-[140%]">{project}</p>
      <p className="text-base font-normal text-[#556070] leading-[140%] whitespace-nowrap">{date}</p>
    </div>
  )
}

export function NotificationTabRequest({ requests }: { requests: RequestItem[] }) {
  const groups = requests.reduce<Record<string, RequestItem[]>>((acc, item) => {
    const key = `${item.project}|${item.date}`
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-2 px-2 pb-2">
      {Object.entries(groups).map(([key, items]) => {
        const [project, date] = key.split("|")
        return (
          <div key={key} className="flex flex-col gap-0">
            <div className="pt-4 pb-2">
              <RequestGroupHeader project={project} date={date} />
            </div>
            {items.map((item) => (
              <RequestItemRow key={item.id} item={item} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

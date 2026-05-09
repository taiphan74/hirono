"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, MessageCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NotificationItem } from "./notification-dropdown"

function NotificationIcon({ type }: { type?: "eye" | "design" | "comment" }) {
  if (type === "eye") return <Eye className="size-5 text-black" />
  if (type === "design") return <DesignNibIcon />
  if (type === "comment") return <MessageCircle className="size-5 text-black" />
  return null
}

function DesignNibIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M6.5 19.5L3 21L4.5 17.5L17.5 4.5C17.8 4.2 18.2 4 18.7 4C19.2 4 19.6 4.2 19.9 4.5L20.5 5.1C20.8 5.4 21 5.8 21 6.3C21 6.8 20.8 7.2 20.5 7.5L6.5 19.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 8.5L15.5 11.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Dot() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="2" fill="black"/>
    </svg>
  )
}

function NotificationItemRow({ item }: { item: NotificationItem }) {
  return (
    <div className={cn("flex flex-col gap-2 p-2 rounded-lg", item.unread ? "bg-white" : "")}>
      <div className="flex items-center gap-2">
        <Avatar size="md" type="image" />
        <div className="flex-1 min-w-0 flex flex-col">
          <p className="text-base font-semibold text-black leading-[140%]">{item.name}</p>
          <div className="flex items-center gap-1">
            <NotificationIcon type={item.icon} />
            <p className="text-base font-normal text-black leading-[140%] whitespace-nowrap">{item.action}</p>
            <Dot />
            <p className="text-base font-normal text-black leading-[140%] whitespace-nowrap">{item.project}</p>
          </div>
        </div>
        <div className="flex flex-col items-end self-stretch justify-between shrink-0">
          {item.unread && <div className="size-3 rounded-full bg-[#1C76FD]" />}
          <p className="text-base font-normal text-[#556070] leading-[140%] whitespace-nowrap">{item.date}</p>
        </div>
      </div>
      {item.preview && (
        <div className="flex items-center gap-[10px] border border-[#D5D8DD] rounded-lg p-2">
          <p className="text-base font-normal text-black leading-[140%] truncate flex-1">{item.preview}</p>
          <Button variant="subtle" size="sm" className="shrink-0 flex items-center justify-center size-8 rounded-lg border border-white bg-white hover:bg-[var(--surface-default-default-hover)] p-0">
            <Check className="size-4 text-black" />
          </Button>
        </div>
      )}
    </div>
  )
}

export function NotificationTabAll({ notifications }: { notifications: NotificationItem[] }) {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <p className="text-base font-semibold text-black leading-[140%]">Notifications</p>
        <Button variant="subtle" size="sm" className="text-base font-normal text-[#15389F] leading-[140%] hover:underline h-auto p-0">Mark all as read</Button>
      </div>
      <div className="flex flex-col gap-0 px-2 pb-2">
        {notifications.map((item) => (
          <NotificationItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Eye, MessageCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NotificationItem {
  id: string
  name: string
  action: string
  icon?: "eye" | "design" | "comment"
  project: string
  date: string
  unread?: boolean
  preview?: string
}

export interface RequestItem {
  id: string
  name: string
  email: string
  project: string
  avatarSrc?: string
}

const defaultNotifications: NotificationItem[] = [
  { id: "1", name: "Name", action: "3 comments", project: "Hirono", date: "March 3" },
  { id: "2", name: "Name", action: "can view", icon: "eye", project: "Hirono", date: "March 3" },
  { id: "3", name: "Name", action: "Can edit", icon: "design", project: "Hirono", date: "March 3" },
  { id: "4", name: "Name", action: "Commented", icon: "comment", project: "Hirono", date: "March 3", unread: true, preview: "Sửa lại thông tin này giúp mình nhé" },
  { id: "5", name: "Name", action: "3 comments", project: "Hirono", date: "March 3", unread: true },
  { id: "6", name: "Name", action: "3 comments", project: "Hirono", date: "March 3", unread: true },
  { id: "7", name: "Name", action: "3 comments", project: "Hirono", date: "March 3", unread: true },
]

const defaultRequests: RequestItem[] = [
  { id: "1", name: "Alice Johnson", email: "alice.johnson@example.com", project: "Hirono" },
  { id: "2", name: "Michael Smith", email: "michael.smith@example.com", project: "Hirono" },
  { id: "3", name: "Jessica Taylor", email: "jessica.taylor@example.com", project: "Hirono" },
  { id: "4", name: "Daniel Brown", email: "daniel.brown@example.com", project: "Hirono" },
  { id: "5", name: "Sophia Davis", email: "sophia.davis@example.com", project: "Hirono" },
  { id: "6", name: "James Wilson", email: "james.wilson@example.com", project: "Hirono" },
  { id: "7", name: "Emily Martinez", email: "emily.martinez@example.com", project: "Hirono" },
]

export type Tab = "all" | "request" | "unread"

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

function RequestItemRow({ item }: { item: RequestItem }) {
  return (
    <div className="flex items-center gap-3 py-2 px-2 rounded-lg">
      <Avatar size="md" type="image" src={item.avatarSrc} />
      <div className="flex-1 min-w-0 flex flex-col">
        <p className="text-base font-semibold text-black leading-[140%]">{item.name}</p>
        <p className="text-base font-normal text-[#556070] leading-[140%]">{item.email}</p>
      </div>
      <Button variant="primary" size="sm">Approve</Button>
    </div>
  )
}

export function NotificationDropdown() {
  const [activeTab, setActiveTab] = useState<Tab>("all")

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "request", label: "Request" },
    { key: "unread", label: "Unread" },
  ]

  const filteredNotifications = activeTab === "all"
    ? defaultNotifications
    : activeTab === "unread"
      ? defaultNotifications.filter(n => n.unread)
      : []

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondarySubtle" size="sm" className="shrink-0 flex items-center justify-center size-[36px] rounded-[8px] border border-[var(--color-gray-200)] bg-white hover:bg-[var(--surface-default-default-hover)] p-0">
          <Bell className="size-5 text-[var(--color-gray-600)]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={8}
        className="z-50 w-[380px] rounded-[16px] border border-[#D5D8DD] bg-white p-0 shadow-lg overflow-hidden"
      >
        <div className="flex flex-col gap-0">
          {/* Tabs */}
          <div className="flex border-b border-[#D5D8DD]">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant="subtle"
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex-1 rounded-none border-b-2 px-3 py-1 text-base leading-[140%] transition-colors h-auto",
                  activeTab === tab.key
                    ? "text-[#22262d] border-b-[#22262d] font-normal"
                    : "text-[#444D5A] border-b-transparent hover:text-[#22262d]"
                )}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <ScrollArea className="max-h-[468px]">
            {activeTab === "request" ? (
              <div className="flex flex-col gap-0 px-2 pb-2">
                {defaultRequests.map((item) => (
                  <RequestItemRow key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-0">
                {/* Header */}
                <div className="flex items-start justify-between px-4 pt-4 pb-2">
                  <p className="text-base font-semibold text-black leading-[140%]">Notifications</p>
                  <Button variant="subtle" size="sm" className="text-base font-normal text-[#15389F] leading-[140%] hover:underline h-auto p-0">Mark all as read</Button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-0 px-2 pb-2">
                  {filteredNotifications.map((item) => (
                    <NotificationItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}

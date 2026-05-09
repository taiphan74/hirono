"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationTabAll } from "./notification-tab-all"
import { NotificationTabRequest } from "./notification-tab-request"
import { NotificationTabUnread } from "./notification-tab-unread"

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
  date: string
  action: string
  icon?: "eye" | "design" | "comment"
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
  { id: "1", name: "Alice Johnson", email: "alice.johnson@example.com", project: "Hirono", date: "March 3", action: "Can edit", icon: "design" },
  { id: "2", name: "Michael Smith", email: "michael.smith@example.com", project: "Hirono", date: "March 3", action: "can view", icon: "eye" },
  { id: "3", name: "Jessica Taylor", email: "jessica.taylor@example.com", project: "Hirono", date: "March 3", action: "Commented", icon: "comment" },
  { id: "4", name: "Daniel Brown", email: "daniel.brown@example.com", project: "Hirono", date: "March 3", action: "Can edit", icon: "design" },
  { id: "5", name: "Sophia Davis", email: "sophia.davis@example.com", project: "Hirono", date: "March 3", action: "3 comments", icon: "comment" },
  { id: "6", name: "James Wilson", email: "james.wilson@example.com", project: "Hirono", date: "March 3", action: "can view", icon: "eye" },
  { id: "7", name: "Emily Martinez", email: "emily.martinez@example.com", project: "Hirono", date: "March 3", action: "Can edit", icon: "design" },
]

export type Tab = "all" | "request" | "unread"

export function NotificationDropdown() {
  const [activeTab, setActiveTab] = useState<Tab>("all")

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "request", label: "Request" },
    { key: "unread", label: "Unread" },
  ]

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
            {activeTab === "all" && <NotificationTabAll notifications={defaultNotifications} />}
            {activeTab === "request" && <NotificationTabRequest requests={defaultRequests} />}
            {activeTab === "unread" && <NotificationTabUnread notifications={defaultNotifications} />}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
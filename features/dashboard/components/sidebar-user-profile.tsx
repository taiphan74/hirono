"use client"

import { Avatar } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarUserProfileProps {
  name: string
  plan: string
  avatarSrc?: string
  onNotificationClick?: () => void
  className?: string
}

export function SidebarUserProfile({
  name,
  plan,
  avatarSrc,
  onNotificationClick,
  className,
}: SidebarUserProfileProps) {
  return (
    <div className={cn("flex items-start gap-3 p-4", className)}>
      <Avatar
        size="lg"
        type={avatarSrc ? "image" : "initial"}
        src={avatarSrc}
        initial={name}
      />
      <div className="flex-1 min-w-0 flex flex-col gap-[2px] leading-none text-[var(--color-gray-500)]">
        <p className="font-semibold text-[16px] leading-[1.4] text-[var(--color-gray-1000)] truncate">
          {name}
        </p>
        <p className="font-normal text-[16px] leading-[1.4] truncate">
          {plan}
        </p>
      </div>
      <button
        onClick={onNotificationClick}
        className="shrink-0 flex items-center justify-center size-[36px] rounded-[8px] border border-[var(--color-gray-200)] bg-white hover:bg-[var(--surface-default-default-hover)] transition-colors"
      >
        <Bell className="size-5 text-[var(--color-gray-600)]" />
      </button>
    </div>
  )
}
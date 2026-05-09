"use client"

import { Avatar } from "@/components/ui/avatar"
import { NotificationDropdown } from "@/features/notification"
import { cn } from "@/lib/utils"

interface SidebarUserProfileProps {
  name: string
  plan: string
  avatarSrc?: string
  className?: string
}

export function SidebarUserProfile({
  name,
  plan,
  avatarSrc,
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
      <NotificationDropdown />
    </div>
  )
}
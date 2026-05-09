"use client"

import { cn } from "@/lib/utils"
import {
  Home,
  Users,
  LayoutList,
  Star,
  Trash2,
  FileText,
  Presentation,
} from "lucide-react"
import Image from "next/image"
import { SidebarNavItem } from "./sidebar-nav-item"
import { SidebarUserProfile } from "./sidebar-user-profile"

interface NavGroup {
  label: string
  items: {
    icon?: React.ComponentType<{ className?: string }>
    label: string
    href?: string
    isActive?: boolean
  }[]
}

interface DashboardSidebarProps {
  userName?: string
  userPlan?: string
  userAvatarSrc?: string
  activeHref?: string
  navGroups?: NavGroup[]
  className?: string
}

const defaultNavGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { icon: Home, label: "Home", href: "/dashboard/home", isActive: true },
      { icon: Users, label: "Community", href: "/dashboard/community" },
      { icon: LayoutList, label: "Project", href: "/dashboard/project" },
      { icon: Star, label: "Bookmark", href: "/dashboard/bookmark" },
      { icon: Trash2, label: "Trash", href: "/dashboard/trash" },
    ],
  },
  {
    label: "Recent",
    items: [
      { icon: FileText, label: "Ghi nháp lớp học", href: "/dashboard/recent/1" },
      { icon: FileText, label: "Cuộc họp thứ tư", href: "/dashboard/recent/2" },
      { icon: Presentation, label: "Độ tăng trưởng của kinh tế 2026", href: "/dashboard/recent/3" },
    ],
  },
]

export function DashboardSidebar({
  userName = "Barchen",
  userPlan = "Pro",
  userAvatarSrc,
  activeHref,
  navGroups = defaultNavGroups,
  className,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col w-[240px] h-full border-r border-[var(--color-gray-300)] bg-white",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-[5px] px-4 py-2">
        <Image
          src="/auth-logo.svg"
          alt="Kojo"
          width={76}
          height={24}
          priority
        />
      </div>

      {/* User profile */}
      <SidebarUserProfile
        name={userName}
        plan={userPlan}
        avatarSrc={userAvatarSrc}
      />

      {/* Navigation groups */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {navGroups.map((group, gi) => (
          <div key={group.label} className="flex flex-col gap-2">
            {gi === 1 && (
              <div className="px-4">
                <div className="h-px bg-[var(--color-gray-300)]" />
              </div>
            )}
            <div className="px-4">
              <p className="h-[38px] flex items-center px-1 py-2 text-[16px] font-semibold leading-[1.4] text-[var(--color-gray-500)]">
                {group.label}
              </p>
            </div>
            <ul className="flex flex-col gap-2 px-4">
              {group.items.map((item) => (
                <SidebarNavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={activeHref ? activeHref === item.href : item.isActive}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
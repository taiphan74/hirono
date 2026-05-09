"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export interface FileListItem {
  id: string
  name: string
  thumbnail?: string
  lastEdited: string
  activeUsers?: { avatar?: string; initials?: string }[]
  activeUsersOverflow?: number
  createdTime: string
}

interface DashboardFileListProps {
  items: FileListItem[]
  className?: string
}

export function DashboardFileList({ items, className }: DashboardFileListProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="text-base font-semibold leading-[140%] text-black whitespace-nowrap">
        Files
      </p>

      <div className="flex flex-col">
        {/* Header */}
        <div className="flex gap-3 items-center px-1 py-2 text-sm text-black">
          <div className="w-[320px] shrink-0">
            <p className="leading-[1.4]">Name</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="leading-[1.4]">Last edited</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="leading-[1.4]">Active in file</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="leading-[1.4]">Created time</p>
          </div>
        </div>

        {/* Rows */}
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/workspace/${item.id}`}
            className="flex gap-4 items-center p-1 border-b border-[var(--color-gray-300)] hover:bg-[var(--color-gray-100)] transition-colors"
          >
            {/* Name + thumbnail */}
            <div className="flex gap-1 items-center shrink-0 w-[320px]">
              <div className="relative shrink-0 size-[60px] rounded-lg overflow-hidden bg-[var(--color-gray-200)]">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="absolute inset-0 object-cover size-full"
                  />
                ) : null}
              </div>
              <p className="text-base leading-[1.4] text-[var(--color-gray-1000)] truncate w-[160px]">
                {item.name}
              </p>
            </div>

            {/* Last edited */}
            <p className="flex-1 min-w-0 text-base leading-[1.4] text-[var(--color-gray-1000)] truncate">
              {item.lastEdited}
            </p>

            {/* Active users */}
            <div className="flex-1 min-w-0 flex gap-1 items-center">
              <div className="flex gap-1 items-center">
                {item.activeUsers?.map((user, i) => (
                  <div
                    key={i}
                    className="relative shrink-0 size-10 rounded-full overflow-hidden bg-[var(--color-gray-200)]"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="absolute inset-0 object-cover size-full"
                      />
                    ) : user.initials ? (
                      <span className="flex items-center justify-center size-full text-xs font-medium text-[var(--color-gray-700)]">
                        {user.initials}
                      </span>
                    ) : null}
                  </div>
                ))}
                {item.activeUsersOverflow ? (
                  <div className="flex items-center justify-center min-w-[30px] h-6 px-1 py-[5px] rounded-2xl bg-[var(--surface-neutral-secondary)] shrink-0">
                    <p className="text-sm text-[var(--color-gray-600)] text-center leading-[1.4]">
                      +{item.activeUsersOverflow}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Created time */}
            <p className="flex-1 min-w-0 text-base leading-[1.4] text-[var(--color-gray-1000)] truncate">
              {item.createdTime}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

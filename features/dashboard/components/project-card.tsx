"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Timer } from "lucide-react"

export interface ProjectCardProps {
  name: string
  timestamp: string
  imageSrc?: string
  avatars: { src?: string; initial?: string }[]
  overflowCount?: number
  fileCount: number
  className?: string
}

export function ProjectCard({
  name,
  timestamp,
  imageSrc,
  avatars,
  overflowCount,
  fileCount,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "flex w-[272px] flex-col items-start gap-2 rounded-lg border border-[#D5D8DD] bg-white p-2",
        className
      )}
    >
      {/* Title */}
      <span className="text-base font-semibold leading-[140%] text-[#111316]">
        {name}
      </span>

      {/* Timestamp */}
      <div className="flex items-center gap-1">
        <Timer className="size-4 text-[#556070]" />
        <span className="text-sm font-normal leading-[140%] text-[#556070]">
          {timestamp}
        </span>
      </div>

      {/* Cover image */}
      <div className="relative h-[121px] w-full overflow-hidden rounded-lg">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[#F5F5F5]" />
        )}
      </div>

      {/* Footer: avatars + file count */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          {avatars.map((avatar, i) => (
            <div
              key={i}
              className="-ml-[4.32px] first:ml-0"
              style={{ zIndex: avatars.length - i }}
            >
              <Avatar
                size="sm"
                type={avatar.src ? "image" : "initial"}
                src={avatar.src}
                initial={avatar.initial}
                className="border-2 border-white"
              />
            </div>
          ))}
          {overflowCount !== undefined && overflowCount > 0 && (
            <div className="-ml-[4.32px] flex h-[18px] items-center justify-center rounded-full bg-[#F5F5F5] px-1.5">
              <span className="text-xs font-medium text-[#556070]">
                +{overflowCount}
              </span>
            </div>
          )}
        </div>

        <span className="text-sm font-normal leading-[140%] text-[#556070]">
          {fileCount} files
        </span>
      </div>
    </div>
  )
}

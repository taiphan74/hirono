"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { ProjectCard } from "./project-card"
import type { ProjectCardProps } from "./project-card"
import { useCreateProjectDialogStore } from "@/stores/dialog-store"

export interface DashboardProjectsProps {
  title?: string
  projects?: Omit<ProjectCardProps, "className">[]
  className?: string
}

const defaultProjects: Omit<ProjectCardProps, "className">[] = [
  {
    name: "UX/UI E-commerce",
    timestamp: "10 minutes ago",
    avatars: [
      { src: "https://i.pravatar.cc/150?u=a" },
      { src: "https://i.pravatar.cc/150?u=b" },
      { src: "https://i.pravatar.cc/150?u=c" },
    ],
    overflowCount: 2,
    fileCount: 8,
  },
  {
    name: "Brand Identity",
    timestamp: "15 minutes ago",
    avatars: [
      { src: "https://i.pravatar.cc/150?u=d" },
      { src: "https://i.pravatar.cc/150?u=e" },
    ],
    fileCount: 5,
  },
  {
    name: "Portfolio Design",
    timestamp: "1 hour ago",
    avatars: [
      { src: "https://i.pravatar.cc/150?u=f" },
      { src: "https://i.pravatar.cc/150?u=g" },
      { src: "https://i.pravatar.cc/150?u=h" },
    ],
    overflowCount: 4,
    fileCount: 12,
  },
  {
    name: "Mobile App",
    timestamp: "2 hours ago",
    avatars: [
      { src: "https://i.pravatar.cc/150?u=i" },
      { src: "https://i.pravatar.cc/150?u=j" },
    ],
    fileCount: 6,
  },
  {
    name: "Dashboard Design",
    timestamp: "3 hours ago",
    avatars: [
      { src: "https://i.pravatar.cc/150?u=k" },
      { src: "https://i.pravatar.cc/150?u=l" },
      { src: "https://i.pravatar.cc/150?u=m" },
    ],
    overflowCount: 1,
    fileCount: 10,
  },
  {
    name: "Landing Page",
    timestamp: "5 hours ago",
    avatars: [
      { src: "https://i.pravatar.cc/150?u=n" },
      { src: "https://i.pravatar.cc/150?u=o" },
    ],
    fileCount: 4,
  },
]

export function DashboardProjects({
  title = "Team project",
  projects = defaultProjects,
  className,
}: DashboardProjectsProps) {
  return (
    <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-8">
        <h1 className="text-xl font-semibold leading-[140%] text-[#111316]">
          {title}
        </h1>
        <Button
          variant="primary"
          size="sm"
          data-icon="inline-end"
          onClick={() => useCreateProjectDialogStore.getState().setOpen(true)}
        >
          Create new
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Grid */}
      <ScrollArea className="flex-1">
        <div className="flex flex-wrap gap-4 px-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

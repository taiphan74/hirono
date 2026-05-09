"use client"

import { DashboardProjects, CreateProjectDialog } from "@/features/dashboard"

export default function ProjectPage() {
  return (
    <div className="px-8">
      <DashboardProjects />
      <CreateProjectDialog />
    </div>
  )
}

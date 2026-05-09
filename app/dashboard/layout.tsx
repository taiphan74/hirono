"use client"

import { DashboardSidebar, DashboardHeader, DashboardToolbar } from "@/features/dashboard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <DashboardToolbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
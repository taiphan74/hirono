"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar, DashboardHeader, DashboardToolbar } from "@/features/dashboard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.replace("/register")
    } else {
      setChecking(false)
    }
  }, [router])

  if (checking) {
    return null
  }

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
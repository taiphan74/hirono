"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/design",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/design/projects",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/design/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/design/help",
  },
]

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-svh w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold">H</span>
              </div>
              <span className="font-semibold">Hirono</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Button variant="ghost" className="w-full justify-start">
                    <LogOut />
                    <span>Logout</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex flex-1 flex-col">
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/95 px-4 py-2 backdrop-blur">
            <SidebarTrigger />
          </div>
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
    </TooltipProvider>
  )
}

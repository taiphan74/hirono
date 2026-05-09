"use client"

import {
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
  useSidebar,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
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

function FloatingSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  const collapsed = state === "collapsed"

  const isActive = (href: string) => {
    if (href === "/design") return pathname === "/design"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside
      data-state={state}
      className={cn(
        "fixed left-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden",
        "border-r bg-sidebar/90 text-sidebar-foreground shadow-2xl backdrop-blur-xl",
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-14" : "w-64"
      )}
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <SidebarTrigger className="h-8 w-8 shrink-0" />

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold">H</span>
          </div>

          <span
            className={cn(
              "truncate font-semibold transition-opacity",
              collapsed && "hidden"
            )}
          >
            Hirono
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={cn(collapsed && "sr-only")}>
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span className={cn(collapsed && "hidden")}>
                        {item.title}
                      </span>
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
            <SidebarMenuButton tooltip="Logout">
              <LogOut />
              <span className={cn(collapsed && "hidden")}>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </aside>
  )
}

export function DesignShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen>
        <div className="relative h-screen w-screen overflow-hidden bg-background">
          <main className="absolute inset-0 z-0">
            {children}
          </main>

          <FloatingSidebar />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

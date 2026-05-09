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
import { SpacePanelHeader } from "@/features/design/components/space-panel-header"
import { Toolbar } from "@/features/design/components/Toolbar"
import { WorkspaceHeader } from "@/features/design/components/workspace-header"
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

function useWorkspaceBasePath() {
  const pathname = usePathname()
  const match = pathname.match(/^\/workspace\/[^/]+/)
  return match ? match[0] : "/workspace"
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    path: "/help",
  },
]

function FloatingSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const basePath = useWorkspaceBasePath()

  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    const href = `${basePath}${path}`
    if (path === "") return pathname === basePath
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
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link href={`${basePath}${item.path}`}>
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
          <div className="relative z-10">
            <WorkspaceHeader />
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

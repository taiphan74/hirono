"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  WorkspaceCardRoot,
  WorkspaceCardImage,
  WorkspaceCardInfo,
  WorkspaceCardIconBox,
  WorkspaceCardTextGroup,
  WorkspaceCardTitle,
  WorkspaceCardDescription,
  WorkspaceCardMenuItem,
  WorkspaceCardMenuSeparator,
} from "./workspace-card"
import type { WorkspaceCardType } from "./workspace-card/workspace-card-icon-box"

function DefaultMenu() {
  return (
    <>
      <WorkspaceCardMenuItem>Restore</WorkspaceCardMenuItem>
      <WorkspaceCardMenuSeparator />
      <WorkspaceCardMenuItem>Delete permanently</WorkspaceCardMenuItem>
    </>
  )
}

export interface TrashItem {
  id: string
  name: string
  description: string
  imageSrc?: string
  type?: WorkspaceCardType
  icon?: React.ReactNode
  menu?: React.ReactNode
}

interface DashboardTrashProps {
  items?: TrashItem[]
  className?: string
}

const types: WorkspaceCardType[] = ["design", "note", "present"]

const defaultItems: TrashItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  name: "Name",
  description: i === 0 ? "Deleted 3 minutes ago" : "Deleted 15 minutes ago",
  type: types[i % 3],
}))

export function DashboardTrash({
  items = defaultItems,
  className,
}: DashboardTrashProps) {
  return (
    <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
      <ScrollArea className="flex-1">
        <div className="grid w-full grid-cols-4 gap-4">
          {items.map((item) => (
            <WorkspaceCardRoot key={item.id} menu={item.menu ?? <DefaultMenu />}>
              <WorkspaceCardImage src={item.imageSrc} />
              <WorkspaceCardInfo>
                <WorkspaceCardIconBox icon={item.icon} type={item.type} />
                <WorkspaceCardTextGroup>
                  <WorkspaceCardTitle>{item.name}</WorkspaceCardTitle>
                  <WorkspaceCardDescription>{item.description}</WorkspaceCardDescription>
                </WorkspaceCardTextGroup>
              </WorkspaceCardInfo>
            </WorkspaceCardRoot>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

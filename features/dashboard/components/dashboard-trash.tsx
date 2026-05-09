"use client"

import { useEffect, useState } from "react"
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
import { dashboardService, type Workspace } from "../services/dashboard.service"

function DefaultMenu({
  workspaceId,
  onRestored,
  onDeleted,
}: {
  workspaceId: string
  onRestored: () => void
  onDeleted: () => void
}) {
  return (
    <>
      <WorkspaceCardMenuItem
        onClick={() =>
          dashboardService
            .restoreWorkspace(workspaceId)
            .then(onRestored)
            .catch(console.error)
        }
      >
        Restore
      </WorkspaceCardMenuItem>
      <WorkspaceCardMenuSeparator />
      <WorkspaceCardMenuItem
        onClick={() =>
          dashboardService
            .deleteWorkspace(workspaceId)
            .then(onDeleted)
            .catch(console.error)
        }
      >
        Delete permanently
      </WorkspaceCardMenuItem>
    </>
  )
}

interface DashboardTrashProps {
  className?: string
}

export function DashboardTrash({ className }: DashboardTrashProps) {
  const [items, setItems] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTrash = () => {
    setLoading(true)
    dashboardService
      .getTrashWorkspaces()
      .then((res) => {
        if (res.status === "SUCCESS") {
          setItems(res.data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTrash()
  }, [])

  if (loading) {
    return (
      <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-gray-400">Trash is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
      <ScrollArea className="flex-1">
        <div className="grid w-full grid-cols-4 gap-4">
          {items.map((item) => (
            <WorkspaceCardRoot key={item.id} menu={<DefaultMenu workspaceId={item.id} onRestored={fetchTrash} onDeleted={fetchTrash} />}>
              <WorkspaceCardImage src={item.thumbnail} />
              <WorkspaceCardInfo>
                <WorkspaceCardIconBox />
                <WorkspaceCardTextGroup>
                  <WorkspaceCardTitle>{item.name}</WorkspaceCardTitle>
                  <WorkspaceCardDescription>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </WorkspaceCardDescription>
                </WorkspaceCardTextGroup>
              </WorkspaceCardInfo>
            </WorkspaceCardRoot>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  WorkspaceCardRoot,
  WorkspaceCardImage,
  WorkspaceCardFavorite,
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
  onDeleted,
}: {
  workspaceId: string
  onDeleted: () => void
}) {
  return (
    <>
      <WorkspaceCardMenuItem>Open</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem>Open in new tab</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem>Rename</WorkspaceCardMenuItem>
      <WorkspaceCardMenuSeparator />
      <WorkspaceCardMenuItem>Copy link</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem>Share</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem>Duplicate</WorkspaceCardMenuItem>
      <WorkspaceCardMenuSeparator />
      <WorkspaceCardMenuItem
        onClick={() =>
          dashboardService
            .toggleFavorite(workspaceId, false)
            .then(onDeleted)
            .catch(console.error)
        }
      >
        Remove from bookmarks
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
        Move to trash
      </WorkspaceCardMenuItem>
    </>
  )
}

interface DashboardBookmarksProps {
  className?: string
}

export function DashboardBookmarks({ className }: DashboardBookmarksProps) {
  const [bookmarks, setBookmarks] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookmarks = () => {
    setLoading(true)
    dashboardService
      .getFavoriteWorkspaces()
      .then((res) => {
        if (res.status === "SUCCESS") {
          setBookmarks(res.data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  const handleRemoved = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  if (loading) {
    return (
      <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
        <p className="text-base font-semibold leading-[140%] text-black whitespace-nowrap">
          Files
        </p>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
      <p className="text-base font-semibold leading-[140%] text-black whitespace-nowrap">
        Files
      </p>
      <ScrollArea className="flex-1">
        <div className="grid w-full grid-cols-4 gap-4">
          {bookmarks.map((item) => (
            <WorkspaceCardRoot key={item.id} menu={<DefaultMenu workspaceId={item.id} onDeleted={() => handleRemoved(item.id)} />}>
              <WorkspaceCardImage src={item.thumbnail}>
                <WorkspaceCardFavorite
                  active
                  onToggle={(fav) => {
                    dashboardService
                      .toggleFavorite(item.id, fav)
                      .then(() => handleRemoved(item.id))
                      .catch(console.error)
                  }}
                />
              </WorkspaceCardImage>
              <WorkspaceCardInfo>
                <WorkspaceCardIconBox />
                <WorkspaceCardTextGroup>
                  <WorkspaceCardTitle>{item.name}</WorkspaceCardTitle>
                  <WorkspaceCardDescription>{new Date(item.updatedAt).toLocaleDateString()}</WorkspaceCardDescription>
                </WorkspaceCardTextGroup>
              </WorkspaceCardInfo>
            </WorkspaceCardRoot>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { DashboardFileList, type FileListItem } from "./dashboard-file-list"
import { useToolbarStore } from "@/stores/dialog-store"
import { dashboardService, type Workspace } from "../services/dashboard.service"

function DefaultMenu({
  workspaceId,
  onDeleted,
}: {
  workspaceId: string
  onDeleted: () => void
}) {
  const router = useRouter()
  const workspaceUrl = `/workspace/${workspaceId}`

  return (
    <>
      <WorkspaceCardMenuItem onClick={() => router.push(workspaceUrl)}>Open</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem onClick={() => window.open(workspaceUrl, "_blank")}>Open in new tab</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem>Rename</WorkspaceCardMenuItem>
      <WorkspaceCardMenuSeparator />
      <WorkspaceCardMenuItem>Copy link</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem>Share</WorkspaceCardMenuItem>
      <WorkspaceCardMenuItem>Duplicate</WorkspaceCardMenuItem>
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

export interface FileItem {
  id: string
  name: string
  description: string
  imageSrc?: string
  favorite?: boolean
  icon?: React.ReactNode
  menu?: React.ReactNode
}

interface DashboardFilesProps {
  files?: FileItem[]
  className?: string
}

export function DashboardFiles({ files, className }: DashboardFilesProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)
  const viewMode = useToolbarStore((s) => s.viewMode)

  const fetchWorkspaces = () => {
    setLoading(true)
    Promise.all([
      dashboardService.getWorkspaces(),
      dashboardService.getFavoriteWorkspaces(),
    ])
      .then(([workspacesRes, favoritesRes]) => {
        if (workspacesRes.status === "SUCCESS") {
          const favoriteIds = favoritesRes.status === "SUCCESS"
            ? new Set(favoritesRes.data.map((w) => w.id))
            : new Set<string>()
          setWorkspaces(
            workspacesRes.data.map((w) => ({
              ...w,
              favorite: favoriteIds.has(w.id),
            }))
          )
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchWorkspaces()

    const handleWorkspaceCreated = () => {
      setLoading(true)
      fetchWorkspaces()
    }

    window.addEventListener("workspace-created", handleWorkspaceCreated)
    return () => window.removeEventListener("workspace-created", handleWorkspaceCreated)
  }, [])

  const handleToggleFavorite = (workspaceId: string, favorite: boolean) => {
    dashboardService
      .toggleFavorite(workspaceId, favorite)
      .then(() => {
        setWorkspaces((prev) =>
          prev.map((w) => (w.id === workspaceId ? { ...w, favorite } : w))
        )
      })
      .catch(console.error)
  }

  const displayFiles: FileItem[] =
    files ?? workspaces.map((w) => ({
      id: w.id,
      name: w.name,
      description: new Date(w.updatedAt).toLocaleDateString(),
      imageSrc: w.thumbnail,
      favorite: w.favorite,
    }))

  const listItems: FileListItem[] = displayFiles.map((f) => ({
    id: f.id,
    name: f.name,
    thumbnail: f.imageSrc,
    lastEdited: f.description,
    createdTime: f.description,
  }))

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

  if (viewMode === "list") {
    return (
      <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
        <DashboardFileList items={listItems} />
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
          {displayFiles.map((file) => (
            <WorkspaceCardRoot key={file.id} href={`/workspace/${file.id}`} menu={file.menu ?? <DefaultMenu workspaceId={file.id} onDeleted={fetchWorkspaces} />}>
              <WorkspaceCardImage src={file.imageSrc}>
                <WorkspaceCardFavorite
                  active={file.favorite ?? false}
                  onToggle={(fav) => handleToggleFavorite(file.id, fav)}
                />
              </WorkspaceCardImage>
              <WorkspaceCardInfo>
                <WorkspaceCardIconBox icon={file.icon} />
                <WorkspaceCardTextGroup>
                  <WorkspaceCardTitle>{file.name}</WorkspaceCardTitle>
                  <WorkspaceCardDescription>{file.description}</WorkspaceCardDescription>
                </WorkspaceCardTextGroup>
              </WorkspaceCardInfo>
            </WorkspaceCardRoot>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

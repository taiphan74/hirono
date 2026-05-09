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
import type { WorkspaceCardType } from "./workspace-card/workspace-card-icon-box"
import { dashboardService, type Workspace } from "../services/dashboard.service"

function DefaultMenu() {
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
      <WorkspaceCardMenuItem>Move to trash</WorkspaceCardMenuItem>
    </>
  )
}

export interface FileItem {
  id: string
  name: string
  description: string
  imageSrc?: string
  favorite?: boolean
  type?: WorkspaceCardType
  icon?: React.ReactNode
  menu?: React.ReactNode
}

interface DashboardFilesProps {
  files?: FileItem[]
  className?: string
}

const types: WorkspaceCardType[] = ["design", "note", "present"]

function mapWorkspaceToFileItem(workspace: Workspace, index: number): FileItem {
  return {
    id: workspace.id,
    name: workspace.name,
    description: new Date(workspace.updatedAt).toLocaleDateString(),
    type: types[index % 3],
  }
}

export function DashboardFiles({ files, className }: DashboardFilesProps) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardService
      .getWorkspaces()
      .then((res) => {
        if (res.status === "SUCCESS") {
          setWorkspaces(res.data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const displayFiles: FileItem[] =
    files ?? workspaces.map((w, i) => mapWorkspaceToFileItem(w, i))

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
          {displayFiles.map((file) => (
            <WorkspaceCardRoot key={file.id} menu={file.menu ?? <DefaultMenu />}>
              <WorkspaceCardImage src={file.imageSrc}>
                <WorkspaceCardFavorite active={file.favorite ?? false} />
              </WorkspaceCardImage>
              <WorkspaceCardInfo>
                <WorkspaceCardIconBox icon={file.icon} type={file.type} />
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

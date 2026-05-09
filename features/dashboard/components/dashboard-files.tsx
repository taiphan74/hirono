"use client"

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

const defaultFiles: FileItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  name: "Name",
  description: "Edit 15 minutes ago",
  type: types[i % 3],
  favorite: i % 6 === 1,
}))

export function DashboardFiles({ files = defaultFiles, className }: DashboardFilesProps) {
  return (
    <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
      <p className="text-base font-semibold leading-[140%] text-black whitespace-nowrap">
        Files
      </p>
      <ScrollArea className="flex-1">
        <div className="grid w-full grid-cols-4 gap-4">
          {files.map((file) => (
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
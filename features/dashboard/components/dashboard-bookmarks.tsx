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
      <WorkspaceCardMenuItem>Remove from bookmarks</WorkspaceCardMenuItem>
      <WorkspaceCardMenuSeparator />
      <WorkspaceCardMenuItem>Move to trash</WorkspaceCardMenuItem>
    </>
  )
}

export interface BookmarkItem {
  id: string
  name: string
  description: string
  imageSrc?: string
  type?: WorkspaceCardType
  icon?: React.ReactNode
  menu?: React.ReactNode
}

interface DashboardBookmarksProps {
  bookmarks?: BookmarkItem[]
  className?: string
}

const types: WorkspaceCardType[] = ["design", "note", "present"]

const defaultBookmarks: BookmarkItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  name: "Name",
  description: "Edit 15 minutes ago",
  type: types[i % 3],
}))

export function DashboardBookmarks({
  bookmarks = defaultBookmarks,
  className,
}: DashboardBookmarksProps) {
  return (
    <div className={cn("flex h-full flex-col gap-2 py-3", className)}>
      <p className="text-base font-semibold leading-[140%] text-black whitespace-nowrap">
        Files
      </p>
      <ScrollArea className="flex-1">
        <div className="grid w-full grid-cols-4 gap-4">
          {bookmarks.map((item) => (
            <WorkspaceCardRoot key={item.id} menu={item.menu ?? <DefaultMenu />}>
              <WorkspaceCardImage src={item.imageSrc}>
                <WorkspaceCardFavorite active />
              </WorkspaceCardImage>
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

"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, MoreHorizontal, Plus, Rows2, Star } from "lucide-react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { dashboardService } from "@/features/dashboard/services/dashboard.service"
import { ShareDialog, type Member, type MemberRole, type InviteRole } from "./share-dialog"

const pages = [
  "Page 1",
  "Page 2",
  "Page 3",
  "Page 4",
  "Page 5",
  "Page 6",
  "Page 7",
]

interface WorkspaceHeaderProps {
  members?: Member[]
  onCopyLink?: () => void
  onRoleChange?: (memberId: string, role: MemberRole) => void
}

export function WorkspaceHeader({
  members = [],
  onCopyLink,
  onRoleChange,
}: WorkspaceHeaderProps) {
  const params = useParams()
  const workspaceId = params.slug as string | undefined

  const [pagesOpen, setPagesOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const handleInvite = async (invitations: { email: string; role: InviteRole }[]) => {
    if (!workspaceId) return

    for (const inv of invitations) {
      await dashboardService.createInvitation(workspaceId, inv)
    }
  }

  return (
    <div className="w-full">
      <header className="flex items-center justify-between w-full px-8 py-4">
        {/* Left: workspace name + actions */}
        <div className="relative flex items-center gap-2 rounded-lg bg-white p-2 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]">
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-base font-semibold text-black leading-[1.4]">
              Hirono
            </span>
            <Button variant="subtle" size="xs" className="size-8 p-0">
              <ChevronDown className="size-4" />
            </Button>
          </div>

          <Button
            variant="subtle"
            size="xs"
            className="size-8 p-0"
            onClick={() => setPagesOpen((o) => !o)}
          >
            <Rows2 className="size-4" />
          </Button>

          {pagesOpen && (
            <div className="absolute left-0 top-full mt-1 z-50 w-full rounded-2xl bg-white p-3 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-base font-semibold text-black leading-[1.4]">
                  Pages
                </span>
                <Button variant="subtle" size="xs" className="size-8 p-0">
                  <Plus className="size-4" />
                </Button>
              </div>

              <ScrollArea className="h-[200px] w-full">
                <div className="flex flex-col gap-1">
                  {pages.map((page) => (
                    <div key={page} className="flex items-center gap-1 w-full min-w-[140px] max-w-[300px] rounded py-2 px-1 hover:bg-[#E6E6E6] cursor-pointer">
                      <span className="flex-1 text-sm text-[#111316] leading-[1.4] truncate">
                        {page}
                      </span>
                      <Button variant="subtle" size="xs" className="size-8 p-0 shrink-0">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Right: avatar + utilities + share */}
        <div className="flex items-center justify-end gap-2.5 rounded-lg bg-white p-2">
          <Button variant="subtle" size="xs" className="gap-1 rounded-2xl p-1">
            <Avatar size="sm" shape="circle" type="initial" initial="A" />
            <ChevronDown className="size-4" />
          </Button>
          <Button variant="secondaryNeutral" size="sm" className="w-[210px] justify-start gap-2 bg-white hover:bg-[#E6E6E6]">
            <Star className="size-5" />
            Utilities
          </Button>
          <Button variant="primary" size="md" onClick={() => setShareOpen(true)}>
            Share
          </Button>
        </div>
      </header>

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        members={members}
        onInvite={handleInvite}
        onCopyLink={onCopyLink}
        onRoleChange={onRoleChange}
      />
    </div>
  )
}
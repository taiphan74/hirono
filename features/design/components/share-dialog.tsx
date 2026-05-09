"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Link2, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUserSearchSocket } from "@/hooks/use-user-search-socket"

type MemberRole = "owner" | "edit" | "view" | "admin"

type Member = {
  id: string
  name: string
  role: MemberRole
  initial?: string
  avatarUrl?: string
}

type SearchedUser = {
  id: string
  fullName?: string
  email?: string
  avatarUrl?: string
}

type InviteRole = "VIEWER" | "EDITOR" | "OWNER"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  members?: Member[]
  onInvite?: (invitations: { email: string; role: InviteRole }[]) => void
  onCopyLink?: () => void
  onRoleChange?: (memberId: string, role: MemberRole) => void
}

const inviteRoleLabels: Record<InviteRole, string> = {
  VIEWER: "Viewer",
  EDITOR: "Editor",
  OWNER: "Owner",
}

function ShareDialog({
  open,
  onOpenChange,
  title = "Share the workspace",
  description = "Create and collab together",
  members = [],
  onInvite,
  onCopyLink,
  onRoleChange,
}: ShareDialogProps) {
  const [email, setEmail] = React.useState("")
  const [selectedUsers, setSelectedUsers] = React.useState<SearchedUser[]>([])
  const [inviteRole, setInviteRole] = React.useState<InviteRole>("VIEWER")
  const [inviting, setInviting] = React.useState(false)
  const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const { connected, users: searchResults, searchUsers } = useUserSearchSocket()

  const handleInputChange = (value: string) => {
    setEmail(value)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!value.trim()) return

    searchTimeoutRef.current = setTimeout(() => {
      if (connected) {
        searchUsers(value.trim())
      }
    }, 300)
  }

  const handleSelectUser = (user: SearchedUser) => {
    if (selectedUsers.find((u) => u.id === user.id)) return
    setSelectedUsers((prev) => [...prev, user])
    setEmail("")
  }

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  const handleInvite = async () => {
    if (selectedUsers.length === 0) return

    const invitations = selectedUsers
      .filter((u) => u.email)
      .map((u) => ({ email: u.email!, role: inviteRole }))

    if (invitations.length === 0) return

    setInviting(true)
    try {
      await onInvite?.(invitations)
      setSelectedUsers([])
      setEmail("")
    } finally {
      setInviting(false)
    }
  }

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-[452px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#D5D8DD] bg-white p-4 shadow-[0px_1px_4px_rgba(12,12,13,0.05),0px_1px_4px_rgba(12,12,13,0.1)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <DialogPrimitive.Title className="text-base font-semibold text-black">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-[#111316]">
                {description}
              </DialogPrimitive.Description>
            </div>
            <Button
              variant="secondaryNeutral"
              size="sm"
              className="h-[40px] gap-2 rounded-lg border-[#D9D9D9] bg-white px-4 text-sm text-[#2C2C2C] hover:bg-[#E6E6E6]"
              onClick={onCopyLink}
            >
              Copy link
              <Link2 className="size-4" />
            </Button>
          </div>

          {/* Invite input */}
          <div className="relative mb-4 flex items-start gap-2">
            <div className="relative flex-1">
              {selectedUsers.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-1 rounded-full bg-[#F5F5F5] px-2 py-1 text-xs text-[#2C2C2C]"
                    >
                      <span className="truncate max-w-[120px]">
                        {user.fullName || user.email}
                      </span>
                      <button
                        type="button"
                        className="ml-0.5 rounded-full hover:bg-[#E6E6E6]"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Input
                placeholder={connected ? "Search users to invite" : "Socket connecting..."}
                className="h-[40px] w-full rounded-lg border-[#D9D9D9] bg-white px-4 text-sm text-[#556070] placeholder:text-[#556070]"
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInvite()
                }}
                disabled={!connected}
              />

              {/* Search results dropdown */}
              {email.trim() && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[200px] overflow-y-auto rounded-lg border border-[#D9D9D9] bg-white p-1 shadow-sm">
                  {searchResults.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm hover:bg-[#F5F5F5]"
                      onClick={() => handleSelectUser(user)}
                    >
                      <Avatar
                        size="sm"
                        shape="circle"
                        type={user.avatarUrl ? "image" : "initial"}
                        initial={user.fullName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                        src={user.avatarUrl}
                        className="bg-[#2C2C2C] text-white shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-[#111316]">{user.fullName || user.email}</span>
                        {user.email && user.fullName && (
                          <span className="text-xs text-[#556070]">{user.email}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as InviteRole)}>
              <SelectTrigger className="h-[40px] w-[100px] shrink-0 rounded-lg border-[#D9D9D9] bg-white px-3 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIEWER">Viewer</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="OWNER">Owner</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="primary"
              size="sm"
              className="h-[40px] shrink-0 rounded-lg px-4 text-base"
              onClick={handleInvite}
              disabled={selectedUsers.length === 0 || inviting}
            >
              {inviting ? "..." : "Invite"}
            </Button>
          </div>

          {/* Access section */}
          {members.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-base text-[#111316]">Access</span>

              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-[#F5F5F5]"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="sm"
                      shape="circle"
                      type={member.avatarUrl ? "image" : "initial"}
                      initial={member.initial ?? member.name.charAt(0).toUpperCase()}
                      src={member.avatarUrl}
                      className="bg-[#2C2C2C] text-white"
                    />
                    <span className="text-sm text-[#111316]">{member.name}</span>
                  </div>

                  {member.role === "owner" ? (
                    <span className="text-sm text-[#111316]">Owner</span>
                  ) : (
                    <Select
                      defaultValue={member.role}
                      onValueChange={(value) =>
                        onRoleChange?.(member.id, value as MemberRole)
                      }
                    >
                      <SelectTrigger className="h-8 w-[89px] gap-1 border-0 bg-transparent px-2 py-1 text-sm text-black shadow-none hover:bg-[#F5F5F5]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="view">View</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export { ShareDialog }
export type { ShareDialogProps, Member, MemberRole, SearchedUser, InviteRole }
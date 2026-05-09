"use client"

import * as React from "react"
import { Dialog } from "radix-ui"
import { X, Upload, ChevronDown, Link } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar } from "@/components/ui/avatar"
import { useCreateProjectDialogStore } from "@/stores/dialog-store"

interface Collaborator {
  id: string
  name: string
  avatar: string
  permission: "view" | "edit" | "comment"
}

const defaultCollaborators: Collaborator[] = [
  { id: "1", name: "Asah", avatar: "https://i.pravatar.cc/150?u=asah", permission: "edit" },
  { id: "2", name: "Adam", avatar: "https://i.pravatar.cc/150?u=adam", permission: "edit" },
]

export function CreateProjectDialog() {
  const open = useCreateProjectDialogStore((s) => s.open)
  const setOpen = useCreateProjectDialogStore((s) => s.setOpen)

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [access, setAccess] = React.useState("edit")
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [collaborators, setCollaborators] = React.useState<Collaborator[]>(defaultCollaborators)

  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    const newCollaborator: Collaborator = {
      id: Math.random().toString(36).slice(2),
      name: inviteEmail.split("@")[0],
      avatar: `https://i.pravatar.cc/150?u=${inviteEmail}`,
      permission: "edit",
    }
    setCollaborators((prev) => [...prev, newCollaborator])
    setInviteEmail("")
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-[444px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-xl",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-bottom-10",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:slide-out-to-bottom-10"
          )}
        >
          {/* Close button */}
          <Dialog.Close asChild>
            <Button
              variant="subtle"
              size="sm"
              className="absolute top-4 right-4"
            >
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </Dialog.Close>

          <div className="flex flex-col gap-5">
            {/* Upload cover */}
            <div className="relative h-[185px] w-full overflow-hidden rounded-lg border border-[#D9D9D9]">
              <img
                src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop"
                alt="Cover"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="subtle" size="sm" className="gap-2 bg-white">
                  <Upload className="size-4" />
                  Upload
                </Button>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-base leading-[1.4] text-[#1E1E1E]">Name of project</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-base leading-[1.4] text-[#1E1E1E]">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>

            {/* Access */}
            <div className="flex flex-col gap-2">
              <label className="text-base leading-[1.4] text-[#1E1E1E]">Anyone access</label>
              <Select value={access} onValueChange={setAccess}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="comment">Comment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Invite collaborators */}
            <div className="flex flex-col gap-2">
              <label className="text-base leading-[1.4] text-[#1E1E1E]">Invite collaborators</label>
              <div className="flex gap-2">
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Add emails to invite"
                  className="flex-1"
                />
                <Button variant="primary" size="sm" onClick={handleInvite}>
                  Invite
                </Button>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                {collaborators.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="flex flex-1 items-center gap-3">
                      <Avatar src={c.avatar} alt={c.name} size="lg" />
                      <span className="text-base text-[#111316]">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1">
                      <span className="text-base capitalize">{c.permission}</span>
                      <ChevronDown className="size-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy link */}
            <Button
              variant="secondaryNeutral"
              size="md"
              className="gap-2 border-[#5036EF] text-[#100B30]"
            >
              Copy link
              <Link className="size-4" />
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

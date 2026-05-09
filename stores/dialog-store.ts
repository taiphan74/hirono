import { create } from "zustand"

interface CreateProjectDialogState {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useCreateProjectDialogStore = create<CreateProjectDialogState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))

interface ToolbarState {
  fileFilter: string
  setFileFilter: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
}

export const useToolbarStore = create<ToolbarState>((set) => ({
  fileFilter: "all",
  setFileFilter: (value) => set({ fileFilter: value }),
  sortBy: "last-viewed",
  setSortBy: (value) => set({ sortBy: value }),
}))

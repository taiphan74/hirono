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
  viewMode: "grid" | "list"
  setViewMode: (value: "grid" | "list") => void
}

export const useToolbarStore = create<ToolbarState>((set) => ({
  fileFilter: "all",
  setFileFilter: (value) => set({ fileFilter: value }),
  sortBy: "last-viewed",
  setSortBy: (value) => set({ sortBy: value }),
  viewMode: "grid",
  setViewMode: (value) => set({ viewMode: value }),
}))

type DesignToolId = "move" | "drag" | "scale" | "section" | "shape" | "text" | "scan" | "comment" | "grid"

type ShapeId =
  | "rect"
  | "rounded"
  | "circle"
  | "diamond"
  | "triangle"
  | "hexagon"

interface DesignToolState {
  activeTool: DesignToolId
  setActiveTool: (tool: DesignToolId) => void
  activeShape: ShapeId
  setActiveShape: (shape: ShapeId) => void
}

export const useDesignToolStore = create<DesignToolState>((set) => ({
  activeTool: "move",
  setActiveTool: (tool) => set({ activeTool: tool }),
  activeShape: "rect",
  setActiveShape: (shape) => set({ activeShape: shape }),
}))

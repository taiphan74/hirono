import { create } from "zustand"

interface SidebarState {
  activeHref: string
  setActiveHref: (href: string) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  activeHref: "",
  setActiveHref: (href) => set({ activeHref: href }),
}))

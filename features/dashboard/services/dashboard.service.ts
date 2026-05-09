import api, { type ApiResponse } from "@/lib/api"

export interface Workspace {
  id: string
  ownerId: string
  folderId: string
  name: string
  isPublish: boolean
  isTrash: boolean
  createdAt: string
  updatedAt: string
}

export const dashboardService = {
  getWorkspaces: (): Promise<ApiResponse<Workspace[]>> =>
    api.get("workspaces"),
}

import api, { type ApiResponse } from "@/lib/api"

export interface Workspace {
  id: string
  ownerId: string
  folderId: string
  name: string
  isPublish: boolean
  isTrash: boolean
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

export interface CreateWorkspaceRequest {
  name: string
  folderId?: string
  isPublish?: boolean
}

export const dashboardService = {
  getWorkspaces: (): Promise<ApiResponse<Workspace[]>> =>
    api.get("workspaces"),

  createWorkspace: (data: CreateWorkspaceRequest): Promise<ApiResponse<Workspace>> =>
    api.post("workspaces", data),
}

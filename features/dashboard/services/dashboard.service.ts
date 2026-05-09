import api, { type ApiResponse } from "@/lib/api"

export interface Workspace {
  id: string
  ownerId: string
  folderId: string
  name: string
  isPublish: boolean
  isTrash: boolean
  thumbnail?: string
  favorite: boolean
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

  getTrashWorkspaces: (): Promise<ApiResponse<Workspace[]>> =>
    api.get("workspaces/trash"),

  createWorkspace: (data: CreateWorkspaceRequest): Promise<ApiResponse<Workspace>> =>
    api.post("workspaces", data),

  getFavoriteWorkspaces: (): Promise<ApiResponse<Workspace[]>> =>
    api.get("workspaces/favorites"),

  toggleFavorite: (workspaceId: string, favorite: boolean): Promise<ApiResponse<Workspace>> =>
    api.patch(`workspaces/${workspaceId}/favorite`, { favorite }),

  uploadThumbnail: (workspaceId: string, file: File): Promise<ApiResponse<Workspace>> => {
    const form = new FormData()
    form.append("thumbnail", file)
    return api.patch(`workspaces/${workspaceId}/thumbnail`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },

  restoreWorkspace: (workspaceId: string): Promise<ApiResponse<string>> =>
    api.post(`workspaces/${workspaceId}/restore`),

  deleteWorkspace: (workspaceId: string): Promise<ApiResponse<string>> =>
    api.delete(`workspaces/${workspaceId}`),
}

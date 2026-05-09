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

export interface CreateInvitationRequest {
  email: string
  role: "VIEWER" | "EDITOR" | "OWNER"
}

export interface Invitation {
  id: string
  workspaceId: string
  workspaceName: string
  workspaceThumbnail: string
  inviterId: string
  inviterFullName: string
  inviterAvatar: string
  inviteeId: string
  inviteeFullName: string
  inviteeEmail: string
  inviteeAvatar: string
  role: "VIEWER" | "EDITOR" | "OWNER"
  status: "PENDING" | "ACCEPTED" | "REJECTED"
  respondedAt: string
  createdAt: string
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

  createInvitation: (
    workspaceId: string,
    data: CreateInvitationRequest,
  ): Promise<ApiResponse<Invitation>> =>
    api.post(`workspaces/${workspaceId}/invitations`, data),
}

import api, { type ApiResponse } from "@/lib/api"

export interface NodePosition {
  x: number
  y: number
}

export interface NodeSize {
  w: number
  h: number
}

export interface CanvasNode {
  id: string
  workspaceId: string
  type: string
  parentId: string | null
  position: NodePosition
  size: NodeSize
  rotation: number
  style: Record<string, string>
  content: Record<string, string>
  createdBy: string
  createdAt: string
  updatedAt: string
  zindex: number
}

export interface CreateNodeRequest {
  type: string
  parentId?: string | null
  position: NodePosition
  size: NodeSize
  rotation?: number
  locked?: boolean
  style?: Record<string, string>
  content?: Record<string, string>
  zindex?: number
}

export interface UpdateNodeRequest {
  type?: string
  parentId?: string | null
  position?: NodePosition
  size?: NodeSize
  rotation?: number
  locked?: boolean
  style?: Record<string, string>
  content?: Record<string, string>
  zindex?: number
}

export interface MoveNodeRequest {
  newParentId: string | null
}

export interface MoveNodeWithChildrenRequest {
  x: number
  y: number
}

const BASE = (workspaceId: string) =>
  `workspaces/${workspaceId}/nodes`

export const nodeService = {
  getNodes: (workspaceId: string): Promise<ApiResponse<CanvasNode[]>> =>
    api.get(BASE(workspaceId)),

  createNode: (
    workspaceId: string,
    data: CreateNodeRequest,
  ): Promise<ApiResponse<CanvasNode>> =>
    api.post(BASE(workspaceId), data),

  deleteNode: (
    workspaceId: string,
    nodeId: string,
  ): Promise<ApiResponse<string>> =>
    api.delete(`${BASE(workspaceId)}/${nodeId}`),

  updateNode: (
    workspaceId: string,
    nodeId: string,
    data: UpdateNodeRequest,
  ): Promise<ApiResponse<CanvasNode>> =>
    api.patch(`${BASE(workspaceId)}/${nodeId}`, data),

  moveNode: (
    workspaceId: string,
    nodeId: string,
    data: MoveNodeRequest,
  ): Promise<ApiResponse<CanvasNode>> =>
    api.patch(`${BASE(workspaceId)}/${nodeId}/move`, data),

  moveNodeWithChildren: (
    workspaceId: string,
    nodeId: string,
    data: MoveNodeWithChildrenRequest,
  ): Promise<ApiResponse<CanvasNode>> =>
    api.patch(`${BASE(workspaceId)}/${nodeId}/move-with-children`, data),
}
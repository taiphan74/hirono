"use client"

import { useCallback, useRef } from "react"
import { nodeService, type CreateNodeRequest, type UpdateNodeRequest } from "@/features/design/services/node.service"

interface SyncOptions {
  workspaceId: string
  /** Debounce delay for updates in ms. Default: 500 */
  updateDebounceMs?: number
}

export function useNodeSync({ workspaceId, updateDebounceMs = 500 }: SyncOptions) {
  const pendingUpdates = useRef<Map<string, { data: UpdateNodeRequest; timer: ReturnType<typeof setTimeout> }>>(new Map())
  const creatingNodes = useRef<Set<string>>(new Set())

  const createNode = useCallback(
    async (nodeId: string, data: CreateNodeRequest) => {
      if (creatingNodes.current.has(nodeId)) return
      creatingNodes.current.add(nodeId)

      try {
        const res = await nodeService.createNode(workspaceId, data)
        return res
      } finally {
        creatingNodes.current.delete(nodeId)
      }
    },
    [workspaceId],
  )

  const updateNode = useCallback(
    (nodeId: string, data: UpdateNodeRequest) => {
      const existing = pendingUpdates.current.get(nodeId)

      if (existing) {
        clearTimeout(existing.timer)
        existing.data = { ...existing.data, ...data }
      } else {
        pendingUpdates.current.set(nodeId, { data, timer: null as unknown as ReturnType<typeof setTimeout> })
      }

      const entry = pendingUpdates.current.get(nodeId)!

      entry.timer = setTimeout(async () => {
        pendingUpdates.current.delete(nodeId)
        try {
          await nodeService.updateNode(workspaceId, nodeId, entry.data)
        } catch (err) {
          console.error("Failed to sync node update:", err)
        }
      }, updateDebounceMs)
    },
    [workspaceId, updateDebounceMs],
  )

  const deleteNode = useCallback(
    async (nodeId: string) => {
      const existing = pendingUpdates.current.get(nodeId)
      if (existing) {
        clearTimeout(existing.timer)
        pendingUpdates.current.delete(nodeId)
      }
      try {
        await nodeService.deleteNode(workspaceId, nodeId)
      } catch (err) {
        console.error("Failed to sync node delete:", err)
      }
    },
    [workspaceId],
  )

  const flushUpdates = useCallback(async () => {
    for (const [nodeId, entry] of pendingUpdates.current) {
      clearTimeout(entry.timer)
      pendingUpdates.current.delete(nodeId)
      try {
        await nodeService.updateNode(workspaceId, nodeId, entry.data)
      } catch (err) {
        console.error("Failed to flush node update:", err)
      }
    }
  }, [workspaceId])

  return { createNode, updateNode, deleteNode, flushUpdates }
}
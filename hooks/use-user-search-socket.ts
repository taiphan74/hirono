"use client"

import { useEffect, useRef, useState } from "react"
import SockJS from "sockjs-client"
import { Client, IMessage } from "@stomp/stompjs"

type UserSearchResponse = {
  id: string
  fullName?: string
  email?: string
  avatarUrl?: string
}

export function useUserSearchSocket() {
  const clientRef = useRef<Client | null>(null)

  const [connected, setConnected] = useState(false)
  const [users, setUsers] = useState<UserSearchResponse[]>([])

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:8080"

    const client = new Client({
      webSocketFactory: () => new SockJS(`${wsUrl}/ws`),

      connectHeaders: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},

      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        setConnected(true)

        client.subscribe("/user/queue/users", (message: IMessage) => {
          const data = JSON.parse(message.body) as UserSearchResponse[]
          setUsers(data)
        })
      },

      onDisconnect: () => {
        setConnected(false)
      },

      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"])
        console.error(frame.body)
      },

      onWebSocketError: (error) => {
        console.error("WebSocket error:", error)
      },
    })

    client.activate()
    clientRef.current = client

    return () => {
      client.deactivate()
      clientRef.current = null
    }
  }, [])

  const searchUsers = (keyword: string) => {
    const client = clientRef.current

    if (!client?.connected) {
      console.warn("Socket chưa connected")
      return
    }

    client.publish({
      destination: "/app/users/search",
      body: keyword,
    })
  }

  return {
    connected,
    users,
    searchUsers,
  }
}

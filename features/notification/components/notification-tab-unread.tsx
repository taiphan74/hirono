"use client"

import { NotificationTabAll } from "./notification-tab-all"
import type { NotificationItem } from "./notification-dropdown"

export function NotificationTabUnread({ notifications }: { notifications: NotificationItem[] }) {
  const unreadNotifications = notifications.filter(n => n.unread)
  return <NotificationTabAll notifications={unreadNotifications} />
}
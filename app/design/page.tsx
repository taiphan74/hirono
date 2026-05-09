
"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DesignPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Design Dashboard</h1>
        <p className="text-muted-foreground">
          This is a placeholder page with skeleton loaders and demo components.
        </p>
      </div>

      {/* Placeholder section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Placeholders (Skeleton)</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Demo components section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Demo Components</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Form Demo</CardTitle>
              <CardDescription>
                Sample input and button to test sidebar interaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter something..." />
              <div className="flex gap-2">
                <Button>Save</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Test sidebar toggle and responsive behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Click the sidebar toggle button (top left) to collapse/expand the sidebar.</p>
              <p>On mobile, the sidebar will appear as a slide-out sheet.</p>
              <p className="text-sm text-muted-foreground">
                Keyboard shortcut: <kbd className="rounded border px-1 font-mono">⌘</kbd> + <kbd className="rounded border px-1 font-mono">B</kbd>
              </p>
            </CardContent>
            <CardFooter className="border-t pt-3">
              <span className="text-xs text-muted-foreground">
                Sidebar supports collapsible "icon" mode
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

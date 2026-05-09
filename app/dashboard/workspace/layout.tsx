import { DesignShell } from "@/features/design/components/design-shell"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DesignShell>{children}</DesignShell>
}

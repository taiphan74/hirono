import { DesignShell } from "@/features/design/components/design-shell"

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DesignShell>{children}</DesignShell>
}

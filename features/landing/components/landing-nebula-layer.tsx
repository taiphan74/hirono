"use client"

import dynamic from "next/dynamic"

const NebulaBackground = dynamic(
  () => import("./nebula-background").then((module) => module.NebulaBackground),
  { ssr: false }
)

export function LandingNebulaLayer(): React.JSX.Element {
  return <NebulaBackground />
}

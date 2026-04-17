import { LandingAiChatBox } from "./landing-ai-chat-box"
import { LandingGlowBackground } from "./landing-glow-background"
import { LandingHeader } from "./landing-header"
import { LandingHeroCopy } from "./landing-hero-copy"

export function LandingPage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-t from-[#111111] to-[#07031F]">
      <LandingGlowBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col">
        <LandingHeader />
        <section className="flex flex-1 flex-col items-center justify-center gap-16 px-6 md:gap-24 md:px-24 lg:gap-[160px] lg:px-64">
          <LandingHeroCopy />
          <LandingAiChatBox />
        </section>
      </div>
    </div>
  )
}

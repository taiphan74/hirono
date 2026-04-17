import { LandingPromptActionBar } from "./landing-prompt-action-bar"

export function LandingAiChatBox(): React.JSX.Element {
  return (
    <div className="flex w-full min-w-[240px] flex-col gap-6 rounded-[32px] border border-[#444444] bg-[#111111] p-4">
      <p className="text-base leading-[1.4] text-white/70">What would you like to start off?</p>
      <LandingPromptActionBar />
    </div>
  )
}

import { Plus, Send, Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"

export function LandingPromptActionBar(): React.JSX.Element {
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex items-center gap-4">
        <IconButton aria-label="Add prompt option" variant="primary" size="sm" className="size-9 p-0">
          <Plus className="size-5" />
        </IconButton>
        <Button variant="primary" size="md" data-icon="inline-end" className="w-[95px]">
          <span>More</span>
          <Settings2 className="size-4" />
        </Button>
      </div>
      <IconButton aria-label="Send prompt" variant="secondaryNeutral" size="sm" className="size-9 p-0">
        <Send className="size-5" />
      </IconButton>
    </div>
  )
}

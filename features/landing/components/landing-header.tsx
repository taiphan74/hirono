import Image from "next/image"

import { Button } from "@/components/ui/button"

export function LandingHeader(): React.JSX.Element {
  return (
    <header className="flex items-center justify-between px-8 py-8 md:px-12">
      <div className="flex items-center" aria-label="Brand mark">
        <Image src="/vercel.svg" alt="Landing logo" width={40} height={35} priority />
      </div>
      <div className="flex w-[194px] gap-4">
        <Button variant="secondary" size="md" className="flex-1">
          Sign in
        </Button>
        <Button variant="neutral" size="md" className="flex-1">
          Register
        </Button>
      </div>
    </header>
  )
}

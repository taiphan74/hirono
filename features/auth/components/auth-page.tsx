import { AuthHeader } from "./auth-header"

type AuthPageProps = {
  children: React.ReactNode
}

export function AuthPage({ children }: AuthPageProps): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AuthHeader />
      <main className="flex h-[calc(100vh-75px)] items-center justify-center overflow-hidden p-[10px]">
        <div className="flex max-w-[1440px] items-center gap-[64px] rounded-[20px] bg-white px-8 py-[52px]">
          <div className="flex w-[425px] flex-shrink-0 flex-col items-center justify-center gap-6 py-10">
            <div className="flex w-full flex-col gap-2">
              <p className="font-['Noto_Serif'] text-[48px] font-bold leading-[1.2] tracking-[-1.44px] text-[#0b0b0c]">
                LET&apos;S WRITE DOWN ALL YOUR{" "}
                <span className="text-[#705bef]">THOUGHTS</span>
              </p>
              <p className="text-[20px] leading-[1.2] text-[#565559]">
                Note everything you want daily and manage it easily from just one place
              </p>
            </div>
            {children}
          </div>
          <div className="relative min-h-[776px] min-w-0 flex-1 overflow-hidden rounded-[24px]">
            <div className="absolute inset-0 bg-white" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bg-login.svg"
              alt=""
              className="h-full w-full object-cover opacity-50"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
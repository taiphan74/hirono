import { AuthHeader } from "./auth-header"

type AuthPageProps = {
  children: React.ReactNode
}

export function AuthPage({ children }: AuthPageProps): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  )
}
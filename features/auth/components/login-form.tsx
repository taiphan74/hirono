"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm(): React.JSX.Element {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[#111316]">Sign in</h1>
        <p className="text-base text-[#757575]">Welcome back! Please enter your details.</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className="text-sm font-medium text-[#444444]">
            Email
          </label>
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className="text-sm font-medium text-[#444444]">
            Password
          </label>
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <Button variant="primary" size="md" className="mt-2">
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-[#757575]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#5036EF] hover:underline">
          Create account
        </Link>
      </p>
    </div>
  )
}

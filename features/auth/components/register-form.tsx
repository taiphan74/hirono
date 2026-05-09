"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function RegisterForm(): React.JSX.Element {
  return (
    <div className="flex w-full max-w-[440px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-[#111316]">Create account</h1>
        <p className="text-base text-[#757575]">Please enter your details to get started.</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2">
          <label htmlFor="register-name" className="text-sm font-medium text-[#444444]">
            Name
          </label>
          <Input
            id="register-name"
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="register-email" className="text-sm font-medium text-[#444444]">
            Email
          </label>
          <Input
            id="register-email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="register-password" className="text-sm font-medium text-[#444444]">
            Password
          </label>
          <Input
            id="register-password"
            type="password"
            placeholder="Create a password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="register-confirm-password" className="text-sm font-medium text-[#444444]">
            Confirm Password
          </label>
          <Input
            id="register-confirm-password"
            type="password"
            placeholder="Confirm your password"
          />
        </div>

        <Button variant="primary" size="md" className="mt-2">
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-[#757575]">
        Already have an account?{" "}
        <Link href="/login" className="text-[#5036EF] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

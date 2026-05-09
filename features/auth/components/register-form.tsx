"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService } from "../services/auth.service"

export function RegisterForm(): React.JSX.Element {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async () => {
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await authService.register({
        fullName,
        email,
        password,
        confirmPassword,
      })
      if (res.status === "SUCCESS") {
        localStorage.setItem("accessToken", res.data.accessToken)
        window.location.href = "/dashboard/home"
      } else {
        setError(res.message ?? "Registration failed")
      }
    } catch (err: unknown) {
      const msg =
        (err as { message?: string })?.message ?? "Something went wrong"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          variant="primary"
          size="md"
          className="mt-2"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
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

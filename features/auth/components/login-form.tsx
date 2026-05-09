"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleButton } from "@/components/ui/google-button"
import { authService } from "../services/auth.service"

export function LoginForm(): React.JSX.Element {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await authService.login({ email, password })
      if (res.status === "SUCCESS") {
        localStorage.setItem("accessToken", res.data.accessToken)
        window.location.href = "/dashboard/home"
      } else {
        setError(res.message ?? "Login failed")
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
    <div className="flex w-full max-w-[440px] flex-col gap-[56px] rounded-2xl border border-[#D9D9D9] bg-white p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className="text-base text-[#1E1E1E]">
            Email
          </label>
          <Input
            id="login-email"
            type="email"
            placeholder="Ahoang@gmail.com"
            className="rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className="text-base text-[#1E1E1E]">
            Password
          </label>
          <Input
            id="login-password"
            type="password"
            placeholder="Password"
            className="rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          variant="primary"
          size="md"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>

        <GoogleButton size="md">Log in with Google</GoogleButton>

        <Link
          href="/forgot-password"
          className="text-base leading-[1.4] text-[#111316] underline decoration-solid [text-decoration-skip-ink:none]"
        >
          Forgot password?
        </Link>
      </div>

      <div className="flex justify-center">
        <p className="text-sm leading-5 text-[#0B0B0C]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#705BEF] underline">
            Create a new one
          </Link>
        </p>
      </div>
    </div>
  )
}

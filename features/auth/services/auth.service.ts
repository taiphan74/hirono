import api, { type ApiResponse } from "@/lib/api"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  user: {
    id: string
    email: string
    fullName: string
    role: string
    avatarUrl: string
  }
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterResponse = LoginResponse

export const authService = {
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> =>
    api.post("auth/login", data),

  register: (data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> =>
    api.post("auth/register", data),
}

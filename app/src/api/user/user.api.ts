import { apiClient } from ".."
import type { LoginFormData } from "../../components/form/user/LoginForm"
import type { RegisterFormData } from "../../components/form/user/RegisterForm"
import type { LoginResponse } from "./user.responses"

const URI = `/users`

export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>(`${URI}/login`, data)
  return res.data
}

export async function registerUser(
  data: Omit<RegisterFormData, "confirmPassword">,
): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>(URI, data)
  return res.data
}

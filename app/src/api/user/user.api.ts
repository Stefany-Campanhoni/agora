import { apiClient } from ".."
import type { LoginFormData } from "../../components/form/user/LoginForm"
import type { RegisterFormData } from "../../components/form/user/RegisterForm"
import type {
  LoginResponse,
  UserListResponse,
  UserResponse,
} from "./user.responses"

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

export async function loadUser(): Promise<UserResponse> {
  const res = await apiClient.get<UserResponse>(`${URI}/me`)
  return res.data
}

export async function getAllUsers(): Promise<UserListResponse> {
  const res = await apiClient.get<UserListResponse>(URI)
  return res.data
}

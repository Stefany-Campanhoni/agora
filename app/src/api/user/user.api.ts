import { apiClient } from ".."
import type { EditFormData } from "../../pages/user/UserEdit"
import type { LoginFormData } from "../../pages/user/UserLogin"
import type { RegisterFormData } from "../../pages/user/UserRegistration"
import type { LoginResponse, UserListResponse, UserResponse } from "./user.responses"

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

export async function canEditUser(user: UserResponse): Promise<boolean> {
  const res = await apiClient.post<boolean>(`${URI}/can-edit`, user)
  return res.data
}

export async function updateUser(user: EditFormData): Promise<UserResponse> {
  const res = await apiClient.put<UserResponse>(`${URI}/me`, user)

  if (res.status !== 200) {
    throw new Error("Erro ao atualizar usuário")
  }

  return res.data
}

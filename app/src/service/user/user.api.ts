import { apiClient } from ".."
import type { EditFormData } from "../../pages/user/UserEdit"
import type { LoginFormData } from "../../pages/user/UserLogin"
import type { RegisterFormData } from "../../pages/user/UserRegistration"
import type {
  ForgotPasswordPayload,
  LoginResponse,
  ResetPasswordPayload,
  User,
  UserList,
} from "./user.types"

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

export async function loadUser(): Promise<User> {
  const res = await apiClient.get<User>(`${URI}/me`)
  return res.data
}

export async function getAllUsers(): Promise<UserList> {
  const res = await apiClient.get<UserList>(URI)
  return res.data
}

export async function canEditUser(user: User): Promise<boolean> {
  const res = await apiClient.post<boolean>(`${URI}/can-edit`, user)
  return res.data
}

export async function updateUser(user: EditFormData): Promise<User> {
  const res = await apiClient.put<User>(`${URI}/me`, user)

  if (res.status !== 200) {
    throw new Error("Erro ao atualizar usuário")
  }

  return res.data
}

export async function resetPassword(resetPasswordFormData: ResetPasswordPayload) {
  const res = await apiClient.post(`${URI}/password/reset`, resetPasswordFormData)

  if (res.status !== 204) {
    throw new Error("Erro ao resetar a senha")
  }
}

export async function forgotPassword(data: ForgotPasswordPayload) {
  const res = await apiClient.post(`${URI}/password/reset`, data)

  if (res.status !== 204) {
    throw new Error("Erro ao enviar email de reset")
  }
}

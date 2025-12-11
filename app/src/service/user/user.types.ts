export type LoginResponse = {
  token: string
}

export type ResetPasswordPayload = {
  newPassword: string
  email: string
  token: string
}

export type User = {
  name: string
  email: string
  profilePicture: string | null
}

export type UserList = {
  users: User[]
}

export type ForgotPasswordPayload = {
  email: string
}

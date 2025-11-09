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
}

export type UserList = {
  users: User[]
}

export type ForgotPasswordPayload = {
  email: string
}

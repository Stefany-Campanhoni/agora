export type LoginResponse = {
  token: string
}

export type UserResponse = {
  name: string
  email: string
}

export type UserListResponse = {
  users: UserResponse[]
}

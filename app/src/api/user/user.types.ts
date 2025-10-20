export type LoginResponse = {
  token: string
}

export type User = {
  name: string
  email: string
}

export type UserList = {
  users: User[]
}

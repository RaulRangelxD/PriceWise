export interface DataToken {
  id: string
  email: string
  [key: string]: unknown
}

export type UserInfo = {
  id: number
  email: string
  username: string
  password: string
  verified: number
}

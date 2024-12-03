export interface DataToken {
  id: string
  email: string
  [key: string]: unknown
}

export type UserInfo = {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  bio: string
  status: string
  password: string
  verified: number
  create_at: string
  update_at: string
}

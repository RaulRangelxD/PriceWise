export interface DataToken {
  id: string
  email: string
  [key: string]: unknown
}

export type UserInfo = {
  id: string
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

export type CompanyData = {
  id: number
  user_id: string
  name: string
  rif: string
  phone: string
  address: string
  create_at: string
  update_at: string
}

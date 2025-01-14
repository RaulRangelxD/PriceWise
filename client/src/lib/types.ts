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

export type ProductData = {
  id: number
  company_id: number
  user_id: string
  name: string
  description: string
  price: number
  weight: number
  weight_unit: string
  quantity: number
  create_at: string
  update_at: string
  categories: string
}

export type CategoryData = {
  id: number
  user_id: string
  name: string
  create_at: string
  update_at: string
}

export type ProductCategoryData = {
  id: number
  product_id: string
  category_id: string
}

export type ProductPriceData = {
  id: number
  product_id: string
  price: string
}

export type FactureData = {
  id: number
  user_id: string
  company_id: string
  total_amount: string
  date: string
  create_at: string
  update_at: string
}

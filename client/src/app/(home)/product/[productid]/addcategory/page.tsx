'use client'

import { useParams } from 'next/navigation'
import { AddProductCategoryForm } from '@/components/organism/home/category/AddProductCategoryForm'

export default function AddProductCompany() {
  const params = useParams<{ productid: string }>()

  return <AddProductCategoryForm productIdInParams={params.productid} />
}

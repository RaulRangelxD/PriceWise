'use client'

import { useParams } from 'next/navigation'
import { DeleteProductCategoryForm } from '@/components/organism/home/category/DeleteProductCategoryForm'

export default function AddProductCompany() {
  const params = useParams<{ productid: string }>()

  return <DeleteProductCategoryForm productIdInParams={params.productid} />
}

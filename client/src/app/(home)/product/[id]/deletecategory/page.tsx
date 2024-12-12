'use client'

import { useParams } from 'next/navigation'
import { DeleteProductCategoryForm } from '@/components/organism/home/category/DeleteProductCategoryForm'

export default function AddProductCompany() {
  const params = useParams<{ id: string }>()

  return <DeleteProductCategoryForm productIdInParams={params.id} />
}

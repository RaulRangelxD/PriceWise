'use client'

import { useParams } from 'next/navigation'
import { AddProductForm } from '@/components/organism/home/product/AddProductForm'

export default function AddProductCompany() {
  const params = useParams<{ companyid: string }>()

  return <AddProductForm companyIdInParams={Number(params.companyid)} />
}

'use client'

import { useParams } from 'next/navigation'
import { AddFactureForm } from '@/components/organism/home/facture/AddFactureForm'
import { useCallback, useEffect, useState } from 'react'
import { ProductData } from '@/lib/types'
import { getAllProductsByCompanyId } from '@/api/products'

export default function AddProductCompany() {
  const params = useParams<{ companyid: string }>()
  const [productsData, setProductsData] = useState<ProductData[]>([])

  const getData = useCallback(async () => {
    try {
      const productsDataResult = await getAllProductsByCompanyId(String(params.companyid))
      setProductsData(productsDataResult)
      console.log(productsDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.companyid])

  useEffect(() => {
    getData()
  }, [getData])

  return <AddFactureForm companyIdInParams={Number(params.companyid)} productsData={productsData} />
}

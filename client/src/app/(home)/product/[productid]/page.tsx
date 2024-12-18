'use client'

import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'
import { Product } from '@/components/template/home/product/Product'
import { ProductData } from '@/lib/types'
import { getProductById } from '@/api/products'

export default function ProductId() {
  const params = useParams<{ productid: string }>()

  const [productData, setProductData] = useState<ProductData | null>(null)

  const getData = useCallback(async () => {
    try {
      const companiesDataResult = await getProductById(Number(params.productid))
      setProductData(companiesDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.productid])

  useEffect(() => {
    getData()
  }, [getData])

  return !productData ? <Loading msg='Loading data' /> : <Product productIdInParams={params.productid} productData={productData} getData={getData} />
}

'use client'

import { EditProductForm } from '@/components/organism/home/product/EditProductForm'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ProductData } from '@/lib/types'
import { getProductById } from '@/api/products'
import Loading from '@/app/Loading'

export default function EditProduct() {
  const params = useParams<{ id: string }>()

  const [productData, setProductData] = useState<ProductData | null>(null)

  const getData = useCallback(async () => {
    try {
      const productsDataResult = await getProductById(Number(params.id))
      setProductData(productsDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.id])

  useEffect(() => {
    getData()
  }, [getData])

  return !productData ? <Loading msg='Loading data' /> : <EditProductForm productData={productData} getData={getData} />
}

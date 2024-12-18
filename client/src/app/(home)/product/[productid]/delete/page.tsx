'use client'

import { DeleteProductForm } from '@/components/organism/home/product/DeleteProductForm'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ProductData } from '@/lib/types'
import { getProductById } from '@/api/products'
import Loading from '@/app/Loading'

export default function DeleteProduct() {
  const params = useParams<{ productid: string }>()

  const [productData, setProductData] = useState<ProductData | null>(null)

  const getData = useCallback(async () => {
    try {
      const productsDataResult = await getProductById(Number(params.productid))
      setProductData(productsDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.productid])

  useEffect(() => {
    getData()
  }, [getData])

  return !productData ? <Loading msg='Loading data' /> : <DeleteProductForm productId={productData.id} />
}

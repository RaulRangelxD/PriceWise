'use client'

import { DeleteCategoryForm } from '@/components/organism/home/category/DeleteCategoryForm'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { CategoryData } from '@/lib/types'
import { getCategoryById } from '@/api/categories'
import Loading from '@/app/Loading'

export default function EditCategory() {
  const params = useParams<{ id: string }>()

  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)

  const getData = useCallback(async () => {
    try {
      const categoryDataResult = await getCategoryById(Number(params.id))
      setCategoryData(categoryDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.id])

  useEffect(() => {
    getData()
  }, [getData])

  return !categoryData ? <Loading msg='Loading data' /> : <DeleteCategoryForm categoryId={categoryData.id} getData={getData} />
}

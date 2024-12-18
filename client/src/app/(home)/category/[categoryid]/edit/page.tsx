'use client'

import { EditCategoryForm } from '@/components/organism/home/category/EditCategoryForm'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { CategoryData } from '@/lib/types'
import { getCategoryById } from '@/api/categories'
import Loading from '@/app/Loading'

export default function EditCategory() {
  const params = useParams<{ categoryid: string }>()

  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)

  const getData = useCallback(async () => {
    try {
      const categoryDataResult = await getCategoryById(Number(params.categoryid))
      setCategoryData(categoryDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.categoryid])

  useEffect(() => {
    getData()
  }, [getData])

  return !categoryData ? <Loading msg='Loading data' /> : <EditCategoryForm categoryData={categoryData} getData={getData} />
}

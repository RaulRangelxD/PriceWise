'use client'

import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'
import { Category } from '@/components/template/home/category/Category'
import { CategoryData } from '@/lib/types'
import { getCategoryById } from '@/api/categories'

export default function CategoryId() {
  const params = useParams<{ categoryid: string }>()

  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)

  const getData = useCallback(async () => {
    try {
      const companiesDataResult = await getCategoryById(Number(params.categoryid))
      setCategoryData(companiesDataResult)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [params.categoryid])

  useEffect(() => {
    getData()
  }, [getData])

  return !categoryData ? <Loading msg='Loading data' /> : <Category categoryData={categoryData} categoryIdInParams={params.categoryid} getData={getData} />
}

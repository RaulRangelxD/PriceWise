'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { BackIcon, EditIcon, TrashIcon } from '@/components/atoms/icons'
import { CategoryData } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface CategoryProps {
  categoryData: CategoryData
  getData: () => void
}

export const Category = ({ categoryData }: CategoryProps) => {
  const router = useRouter()

  return (
    <div className='w-full px-2 py-8 flex-1 flex flex-col justify-center items-center'>
      <div className='max-w-4xl w-full space-y-3'>
        <div>
          <DefaultButton
            onClick={() => {
              router.back()
            }}
          >
            <BackIcon size='sm' className='me-1' />
            Back
          </DefaultButton>
        </div>
        <div className='flex flex-col border rounded-xl bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'>
          <h1 className='text-2xl font-bold m-8'>{categoryData.name}</h1>
          <div className='flex flex-row flex-wrap'>
            <div className='m-8'>
              <span className='text-lg'>Created</span>
              <p className='font-semibold'>{categoryData.create_at}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Updated</span>
              <p className='font-semibold'>{categoryData.update_at}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap'>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/category/${categoryData.id}/edit`)
            }}
          >
            <EditIcon size='sm' className='me-1' /> Edit Category
          </DefaultButton>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/category/${categoryData.id}/delete`)
            }}
          >
            <TrashIcon size='sm' className='me-1' /> Delete Category
          </DefaultButton>
        </div>
      </div>
    </div>
  )
}

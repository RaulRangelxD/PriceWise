'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { BackIcon } from '@/components/atoms/icons/Back'
import { EditIcon } from '@/components/atoms/icons/Edit'
import { TrashIcon } from '@/components/atoms/icons/TrashIcon'
import { ProductData } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface ProductProps {
  productData: ProductData
  getData: () => void
}

export const Product = ({ productData }: ProductProps) => {
  const router = useRouter()

  return (
    <div className='w-full px-2 flex-1 flex flex-col justify-center items-center'>
      <div className='max-w-4xl w-full space-y-3'>
        <div>
          <DefaultButton
            onClick={() => {
              router.push('/')
            }}
          >
            <BackIcon size='sm' className='me-1' />
            Back to Home
          </DefaultButton>
        </div>
        <div className='flex flex-col border rounded-xl bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'>
          <h1 className='text-2xl font-bold m-8'>{productData.name}</h1>
          <div className='flex flex-row flex-wrap'>
            <div className='m-8'>
              <span className='text-lg'>Description</span>
              <p className='font-semibold'>{productData.description}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Price</span>
              <p className='font-semibold'>{productData.price}$</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Weight</span>
              <p className='font-semibold'>
                {productData.weight}
                <span> </span>
                {productData.weight_unit}
              </p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Quantity</span>
              <p className='font-semibold'>{productData.quantity}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Created</span>
              <p className='font-semibold'>{productData.create_at}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Updated</span>
              <p className='font-semibold'>{productData.update_at}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap'>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/company/${productData.id}/edit`)
            }}
          >
            <EditIcon size='sm' className='me-1' /> Edit Product
          </DefaultButton>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/company/${productData.id}/delete`)
            }}
          >
            <TrashIcon size='sm' className='me-1' /> Delete Product
          </DefaultButton>
        </div>
      </div>
    </div>
  )
}

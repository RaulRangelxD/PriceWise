'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { BackIcon, PlusIcon } from '@/components/atoms/icons'
import { ProductsTable } from '@/components/organism/home/product/ProductsTable'
import { useRouter } from 'next/navigation'

export const Products = () => {
  const router = useRouter()

  return (
    <div className='w-full px-2 py-8 flex-1 flex flex-col justify-center items-center'>
      <div className='max-w-4xl w-full space-y-3'>
        <DefaultButton
          onClick={() => {
            router.back()
          }}
        >
          <BackIcon size='sm' className='me-1' />
          Back
        </DefaultButton>
        <ProductsTable rows={[5, 10, 20, 50, 100]} rowsDefault={5} />
        <DefaultButton
          onClick={() => {
            router.push(`/product/add`)
          }}
        >
          <PlusIcon size='sm' className='me-1' />
          Add product
        </DefaultButton>
      </div>
    </div>
  )
}

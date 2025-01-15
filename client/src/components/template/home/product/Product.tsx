'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { PlusIcon } from '@/components/atoms/icons'
import { BackIcon } from '@/components/atoms/icons/Back'
import { EditIcon } from '@/components/atoms/icons/Edit'
import { TrashIcon } from '@/components/atoms/icons/TrashIcon'
import { ProductsPriceTable } from '@/components/organism/home/productPrices/ProductPricesTable'
import { ProductData } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface ProductProps {
  productIdInParams: string
  productData: ProductData
  getData: () => void
}

export const Product = ({ productIdInParams, productData }: ProductProps) => {
  const router = useRouter()

  return (
    <div className='w-full px-2 flex-1 flex flex-col justify-center items-center'>
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
        <div className='largebox-border-shadow'>
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
              <span className='text-lg'>Categories</span>
              <p className='font-semibold'>{productData.categories}</p>
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
              router.push(`/product/${productData.id}/edit`)
            }}
          >
            <EditIcon size='sm' className='me-1' /> Edit Product
          </DefaultButton>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/product/${productData.id}/addcategory`)
            }}
          >
            <PlusIcon size='sm' className='me-1' /> Add a Category
          </DefaultButton>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/product/${productData.id}/delete`)
            }}
          >
            <TrashIcon size='sm' className='me-1' /> Delete Product
          </DefaultButton>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/product/${productData.id}/deletecategory`)
            }}
          >
            <TrashIcon size='sm' className='me-1' /> Delete a Category
          </DefaultButton>
        </div>
        <h2 className='w-full flex justify-center text-2xl font-bold'>Prices</h2>
        <ProductsPriceTable productIdInParams={productIdInParams} rows={[5, 10, 20]} rowsDefault={5} />
      </div>
    </div>
  )
}

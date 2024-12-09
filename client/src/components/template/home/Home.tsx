'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { CompaniesTable } from '@/components/organism/home/company/CompaniesTable'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { useToastify } from '@/context/ToastifyProvider'
import { ProductsTable } from '@/components/organism/home/product/ProductsTable'
import { PlusIcon } from '@/components/atoms/icons/Plus'

export const Home = () => {
  const router = useRouter()
  const { userInContext } = useAuth()
  const { notifyWarning } = useToastify()

  return (
    <>
      <div className='w-full px-2 sm:px-4 md:px-8 lg:px-16 flex-1 flex flex-col items-center justify-center'>
        <div className='max-w-7xl flex flex-col space-y-2 justify-center items-center w-full'>
          <CompaniesTable />
          <div className='pb-12'>
            {!userInContext ? (
              <DefaultButton
                onClick={() => {
                  notifyWarning('must logged for add companies')
                }}
              >
                <PlusIcon size='sm' className='me-1' />
                Add company
              </DefaultButton>
            ) : (
              <DefaultButton
                onClick={() => {
                  router.push(`/company/add`)
                }}
              >
                <PlusIcon size='sm' className='me-1' />
                Add company
              </DefaultButton>
            )}
          </div>
          <ProductsTable />
          <div className='pb-12'>
            {!userInContext ? (
              <DefaultButton
                onClick={() => {
                  notifyWarning('must logged for add products')
                }}
              >
                <PlusIcon size='sm' className='me-1' />
                Add product
              </DefaultButton>
            ) : (
              <DefaultButton
                onClick={() => {
                  router.push(`/product/add`)
                }}
              >
                <PlusIcon size='sm' className='me-1' />
                Add product
              </DefaultButton>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

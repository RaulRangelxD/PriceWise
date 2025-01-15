'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { CompaniesTable } from '@/components/organism/home/company/CompaniesTable'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { useToastify } from '@/context/ToastifyProvider'
import { ProductsTable } from '@/components/organism/home/product/ProductsTable'
import { PlusIcon, EyeIcon } from '@/components/atoms/icons'
import { CategoriesTable } from '@/components/organism/home/category/CategoriesTable'
import { FacturesTable } from '@/components/organism/home/facture/FacturesTable'
import { GraphicsFactures } from '@/components/organism/home/facture/GraphicsFactures'

export const Home = () => {
  const router = useRouter()
  const { userInContext } = useAuth()
  const { notifyWarning } = useToastify()

  return (
    <>
      <div className='w-full px-2 py-8 flex-1 flex flex-col justify-center items-center'>
        <div className='max-w-4xl w-full space-y-3'>
          <h2 className='text-3xl font-bold mt-8'>Expenses</h2>

          <GraphicsFactures lastYear={true} />
          <h2 className='text-3xl font-bold mt-8'>Last companies</h2>
          <CompaniesTable rows={[5, 10, 20]} rowsDefault={5} />
          <div className='flex flex-row flex-wrap pb-12'>
            {!userInContext ? (
              <DefaultButton
                className='m-2'
                onClick={() => {
                  notifyWarning('must logged for add companies')
                }}
              >
                <PlusIcon size='sm' className='me-1' />
                Add company
              </DefaultButton>
            ) : (
              <>
                <DefaultButton
                  className='m-2'
                  onClick={() => {
                    router.push(`/company/add`)
                  }}
                >
                  <PlusIcon size='sm' className='me-1' />
                  Add company
                </DefaultButton>
                <DefaultButton
                  className='m-2'
                  color='btn-secondary'
                  onClick={() => {
                    router.push(`/company`)
                  }}
                >
                  <EyeIcon size='sm' className='me-1' />
                  See companies
                </DefaultButton>
              </>
            )}
          </div>
          <h2 className='text-3xl font-bold mt-8'>Last products</h2>
          <ProductsTable rows={[5, 10, 20]} rowsDefault={5} />
          <div className='flex flex-row flex-wrap pb-12'>
            {!userInContext ? (
              <DefaultButton
                className='m-2'
                onClick={() => {
                  notifyWarning('must logged for add products')
                }}
              >
                <PlusIcon size='sm' className='me-1' />
                Add product
              </DefaultButton>
            ) : (
              <>
                <DefaultButton
                  className='m-2'
                  onClick={() => {
                    router.push(`/product/add`)
                  }}
                >
                  <PlusIcon size='sm' className='me-1' />
                  Add product
                </DefaultButton>
                <DefaultButton
                  className='m-2'
                  color='btn-secondary'
                  onClick={() => {
                    router.push(`/product`)
                  }}
                >
                  <EyeIcon size='sm' className='me-1' />
                  See products
                </DefaultButton>
              </>
            )}
          </div>
          <h2 className='text-3xl font-bold mt-8'>Last categories</h2>
          <CategoriesTable rows={[5, 10, 20]} rowsDefault={5} />
          <div className='flex flex-row flex-wrap pb-12'>
            {!userInContext ? (
              <DefaultButton
                className='m-2'
                onClick={() => {
                  notifyWarning('must logged for add categories')
                }}
              >
                <PlusIcon size='sm' className='me-1' />
                Add category
              </DefaultButton>
            ) : (
              <>
                <DefaultButton
                  className='m-2'
                  onClick={() => {
                    router.push(`/category/add`)
                  }}
                >
                  <PlusIcon size='sm' className='me-1' />
                  Add category
                </DefaultButton>
                <DefaultButton
                  className='m-2'
                  color='btn-secondary'
                  onClick={() => {
                    router.push(`/category`)
                  }}
                >
                  <EyeIcon size='sm' className='me-1' />
                  See categories
                </DefaultButton>
              </>
            )}
          </div>
          <h2 className='text-3xl font-bold mt-8'>Last factures</h2>
          <FacturesTable rows={[5, 10, 20]} rowsDefault={5} />
        </div>
      </div>
    </>
  )
}

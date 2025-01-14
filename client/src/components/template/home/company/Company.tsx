'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { BackIcon } from '@/components/atoms/icons/Back'
import { EditIcon } from '@/components/atoms/icons/Edit'
import { PlusIcon } from '@/components/atoms/icons/Plus'
import { TrashIcon } from '@/components/atoms/icons/TrashIcon'
import { FacturesTable } from '@/components/organism/home/facture/FacturesTable'
import { ProductsTable } from '@/components/organism/home/product/ProductsTable'
import { CompanyData } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface CompanyProps {
  companyData: CompanyData
  companyIdInParams: number
  getData: () => void
}

export const Company = ({ companyData, companyIdInParams }: CompanyProps) => {
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
          <h1 className='text-2xl font-bold m-8'>{companyData.name}</h1>
          <div className='flex flex-row flex-wrap'>
            <div className='m-8'>
              <span className='text-lg'>Rif</span>
              <p className='font-semibold'>{companyData.rif}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Phone</span>
              <p className='font-semibold'>{companyData.phone}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Address</span>
              <p className='font-semibold'>{companyData.address}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Created</span>
              <p className='font-semibold'>{companyData.create_at}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Updated</span>
              <p className='font-semibold'>{companyData.update_at}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap'>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/company/${companyData.id}/addproduct`)
            }}
          >
            <PlusIcon size='sm' className='me-1' />
            Add product
          </DefaultButton>
          <DefaultButton
            className='m-2'
            onClick={() => {
              router.push(`/company/${companyData.id}/addfacture`)
            }}
          >
            <PlusIcon size='sm' className='me-1' />
            Add facture
          </DefaultButton>
          <DefaultButton
            color='btn-secondary'
            className='m-2'
            onClick={() => {
              router.push(`/company/${companyData.id}/edit`)
            }}
          >
            <EditIcon size='sm' className='me-1' /> Edit Company
          </DefaultButton>
          <DefaultButton
            color='btn-third'
            className='m-2'
            onClick={() => {
              router.push(`/company/${companyData.id}/delete`)
            }}
          >
            <TrashIcon size='sm' className='me-1' /> Delete Company
          </DefaultButton>
        </div>
        <ProductsTable companyIdInParams={companyIdInParams} rows={[5, 10, 20]} rowsDefault={5} />
        <FacturesTable companyIdInParams={companyIdInParams} rows={[5, 10, 20]} rowsDefault={5} />
      </div>
    </div>
  )
}

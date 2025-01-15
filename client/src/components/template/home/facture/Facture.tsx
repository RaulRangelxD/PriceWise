'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { TrashIcon } from '@/components/atoms/icons'
import { BackIcon } from '@/components/atoms/icons/Back'
import { FacturesProductTable } from '@/components/organism/home/factureProducts/FactureProductsTable'
import { FactureData } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface FactureProps {
  factureIdInParams: string
  factureData: FactureData
  getData: () => void
}

export const Facture = ({ factureIdInParams, factureData }: FactureProps) => {
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
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold mx-8 mt-8'>Total Amount</h1>
            <p className='text-2xl mx-8 mb-8'>{factureData.total_amount}</p>
          </div>

          <div className='flex flex-row flex-wrap'>
            <div className='m-8'>
              <span className='text-lg'>Date</span>
              <p className='font-semibold'>{factureData.date}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Created</span>
              <p className='font-semibold'>{factureData.create_at}</p>
            </div>
            <div className='m-8'>
              <span className='text-lg'>Updated</span>
              <p className='font-semibold'>{factureData.update_at}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap'>
          <DefaultButton
            color='btn-third'
            className='m-2'
            onClick={() => {
              router.push(`/facture/${factureData.id}/delete`)
            }}
          >
            <TrashIcon size='sm' className='me-1' /> Delete Facture
          </DefaultButton>
        </div>
        <h2 className='w-full flex justify-center text-2xl font-bold'>Products</h2>
        <FacturesProductTable factureIdInParams={factureIdInParams} rows={[5, 10, 20]} rowsDefault={5} />
      </div>
    </div>
  )
}

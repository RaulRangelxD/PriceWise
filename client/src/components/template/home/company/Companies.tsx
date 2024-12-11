'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { BackIcon, PlusIcon } from '@/components/atoms/icons'
import { CompaniesTable } from '@/components/organism/home/company/CompaniesTable'
import { useRouter } from 'next/navigation'

export const Companies = () => {
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
        <CompaniesTable rows={[5, 10, 20, 50, 100]} rowsDefault={5} />
        <DefaultButton
          onClick={() => {
            router.push(`/company/add`)
          }}
        >
          <PlusIcon size='sm' className='me-1' />
          Add company
        </DefaultButton>
      </div>
    </div>
  )
}

'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { CompaniesTable } from '@/components/organism/home/company/CompaniesTable'
import { useRouter } from 'next/navigation'

export const Home = () => {
  const router = useRouter()

  return (
    <>
      <div className='w-full px-2 sm:px-4 md:px-8 lg:px-16 flex-1 flex flex-col items-center justify-center'>
        <div className='max-w-7xl flex flex-col space-y-2 justify-center items-center w-full'>
          <CompaniesTable />
          <div>
            <DefaultButton
              onClick={() => {
                router.push(`/company/add`)
              }}
            >
              Add company
            </DefaultButton>
          </div>
        </div>
      </div>
    </>
  )
}

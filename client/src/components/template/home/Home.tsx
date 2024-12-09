'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { CompaniesTable } from '@/components/organism/home/company/CompaniesTable'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { useToastify } from '@/context/ToastifyProvider'

export const Home = () => {
  const router = useRouter()
  const { userInContext } = useAuth()
  const { notifyWarning } = useToastify()

  return (
    <>
      <div className='w-full px-2 sm:px-4 md:px-8 lg:px-16 flex-1 flex flex-col items-center justify-center'>
        <div className='max-w-7xl flex flex-col space-y-2 justify-center items-center w-full'>
          <CompaniesTable />
          <div>
            {!userInContext ? (
              <DefaultButton
                onClick={() => {
                  notifyWarning('must logged for add companies')
                }}
              >
                Add company
              </DefaultButton>
            ) : (
              <DefaultButton
                onClick={() => {
                  router.push(`/company/add`)
                }}
              >
                Add company
              </DefaultButton>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

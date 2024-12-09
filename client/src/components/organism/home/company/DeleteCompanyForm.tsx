'use client'

import { deleteCompany } from '@/api/companies'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { TrashIcon } from '@/components/atoms/icons/TrashIcon'
import { useToastify } from '@/context/ToastifyProvider'
import { useRouter } from 'next/navigation'

interface DeleteCompanyFormProps {
  color?: 'btn-primary' | 'btn-secondary' | 'btn-third' | ''
  companyId: number
  getData: () => void
}

export const DeleteCompanyForm = ({ color = 'btn-primary', companyId }: DeleteCompanyFormProps) => {
  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await deleteCompany(companyId)
      notifySuccess('Company edited succesfull', { autoClose: 2500 })
      router.push(`/`)
    } catch (e) {
      console.log('Error authenticating user', e)
      notifyError('Error editing Company', { autoClose: 2500 })
    }
  }
  return (
    <>
      <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
        <div className='max-w-md w-full flex flex-col items-center justify-center border border-opacity-30 border-defaul-dark dark:border-default-light py-4 px-8 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 shadow-2xl  backdrop-blur-sm rounded transition duration-500'>
          <div className='flex flex-col justify-center items-center space-y-2'>
            <h1 className='text-2xl font-bold'>Delete</h1>
            <h2 className='text-xl'>Are you sure delete this company?</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <DefaultButton color={color} className='w-full' type='submit'>
                <TrashIcon size='sm' className='me-1' />
                Delete
              </DefaultButton>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

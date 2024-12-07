'use client'

import { deleteCompany } from '@/api/companies'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { TrashIcon } from '@/components/atoms/icons/TrashIcon'

interface DeleteCompanyFormProps {
  color?: 'btn-primary' | 'btn-secondary' | 'btn-third' | ''
  companyId: number
  getData: () => void
}

export const DeleteCompanyForm = ({ color = 'btn-primary', companyId, getData }: DeleteCompanyFormProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await deleteCompany(companyId)
      getData()
    } catch (e) {
      console.log('Error authenticating user', e)
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DefaultButton color={color} size='sm' className='w-full' type='submit'>
          <TrashIcon size='sm' />
        </DefaultButton>
      </form>
    </>
  )
}

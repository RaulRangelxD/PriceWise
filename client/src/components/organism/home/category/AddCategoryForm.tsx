'user client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { BackIcon, PlusIcon } from '@/components/atoms/icons'
import { postCategory } from '@/api/categories'

export const AddCategoryForm = () => {
  const [name, setName] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')

  const [error, setError] = useState('')

  const { userInContext } = useAuth()
  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const validateName = (name: string) => {
    const isValid = /^[^,]{1,40}$/.test(name)
    setNameError(isValid ? '' : 'Invalid name format only 40 caracters')
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateName(name)) return

    try {
      if (!userInContext) return
      await postCategory(userInContext.id, name)
      notifySuccess('Category registered succesfull', { autoClose: 2500 })
      setError('')
      router.back()
    } catch (e) {
      console.log('Error register Category', e)
      setError('Error register Category')
      notifyError('Error register Category', { autoClose: 2500 })
    }
  }
  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
      <div className='box-border-shadow'>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
          <InputForm placeholder='Category Name' value={name} onChange={setName} onBlur={validateName} />
          {nameError && <p className='text-red-500 mt-2'>{nameError}</p>}

          {error && <p className='text-red-500'>{error}</p>}

          <div className='flex flex-row space-x-2 justify-center'>
            <DefaultButton type='submit'>
              <PlusIcon />
              Add Category
            </DefaultButton>
            <DefaultButton
              color='btn-secondary'
              type='button'
              onClick={() => {
                router.back()
              }}
            >
              <BackIcon size='sm' className='me-1' />
              Back
            </DefaultButton>
          </div>
        </form>{' '}
      </div>
    </div>
  )
}

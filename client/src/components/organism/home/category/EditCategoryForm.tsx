'user client'

import { patchCategory } from '@/api/categories'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useCallback, useEffect, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { CategoryData } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface EditCategoryFormProps {
  categoryData: CategoryData
  getData: () => void
}

export const EditCategoryForm = ({ categoryData, getData }: EditCategoryFormProps) => {
  const [name, setName] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')

  const [error, setError] = useState('')

  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const getEditData = useCallback(async () => {
    setName(categoryData.name)
  }, [categoryData])

  const validateName = (name: string) => {
    const isValid = /^.{1,40}$/.test(name)
    setNameError(isValid ? '' : 'Invalid name format only 40 caracters')
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateName(name)) return

    try {
      await patchCategory(name, categoryData.id)
      notifySuccess('Category edited succesfull', { autoClose: 2500 })
      getData()
      router.back()
    } catch (e) {
      console.log('Error editing Category', e)
      setError('Error editing Category')
      notifyError('Error editing Category', { autoClose: 2500 })
    }
  }
  useEffect(() => {
    getEditData()
  }, [getEditData])
  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
      <div className='box-border-shadow'>
        <h1 className='text-2xl font-bold'>Edit</h1>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
          <InputForm placeholder='Category Name' value={name} onChange={setName} onBlur={validateName} />
          {nameError && <p className='text-red-500 mt-2'>{nameError}</p>}

          {error && <p className='text-red-500'>{error}</p>}

          <div className='flex flex-row space-x-2 justify-center'>
            <DefaultButton type='submit'>Edit Category</DefaultButton>
            <DefaultButton
              type='button'
              color='btn-secondary'
              onClick={() => {
                router.back()
              }}
            >
              Back
            </DefaultButton>
          </div>
        </form>
      </div>
    </div>
  )
}

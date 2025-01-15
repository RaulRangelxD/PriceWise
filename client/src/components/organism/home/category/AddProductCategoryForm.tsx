'user client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { useCallback, useEffect, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { BackIcon, PlusIcon } from '@/components/atoms/icons'
import { postProductCategory } from '@/api/productCategories'
import Loading from '@/app/Loading'
import { getAllCategoriesByUserIdAndNotProductId } from '@/api/categories'
import { CategoryData } from '@/lib/types'
import { SelectInput } from '@/components/atoms/inputs/SelectInput'

interface AddProductCategoryFormProps {
  productIdInParams: string
}
export const AddProductCategoryForm = ({ productIdInParams }: AddProductCategoryFormProps) => {
  const [category, setCategory] = useState<string>('')
  const [productId, setProductId] = useState<string>('')
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([])

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(true)

  const { userInContext } = useAuth()
  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!userInContext) return
      await postProductCategory(productId, category)
      notifySuccess('Category registered succesfull', { autoClose: 2500 })
      setError('')
      router.back()
    } catch (e) {
      console.log('Error register Category', e)
      setError('Error register Category')
      notifyError('Error register Category', { autoClose: 2500 })
    }
  }

  const getData = useCallback(async () => {
    try {
      if (!userInContext) return
      const categoriesDataResult = await getAllCategoriesByUserIdAndNotProductId(userInContext.id, productIdInParams)
      console.log(categoriesDataResult)
      setCategoriesData(categoriesDataResult)
      setLoading(false)
      if (productIdInParams) setProductId(productIdInParams)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [productIdInParams, userInContext])

  useEffect(() => {
    getData()
  }, [getData])

  return !loading ? (
    <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
      <div className='box-border-shadow'>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
          <SelectInput
            value={category.toString()}
            onChange={(value) => setCategory(value)}
            className='w-full rounded-t-xl focus:bg-default-light focus:dark:bg-default-dark focus:bg-opacity-50 focus:dark:bg-opacity-50'
            options={categoriesData.map((category) => ({
              value: category.id,
              name: category.name,
            }))}
            placeholder='Select a company'
          />

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
  ) : (
    <Loading msg='Loading Data' />
  )
}

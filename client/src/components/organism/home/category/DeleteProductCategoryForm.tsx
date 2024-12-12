'user client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { useCallback, useEffect, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { BackIcon, TrashIcon } from '@/components/atoms/icons'
import { deleteProductCategoryByProductIdAndCategoryId } from '@/api/productCategories'
import Loading from '@/app/Loading'
import { getAllCategoriesByProductId } from '@/api/categories'
import { CategoryData } from '@/lib/types'

interface DeleteProductCategoryFormProps {
  productIdInParams: string
}
export const DeleteProductCategoryForm = ({ productIdInParams }: DeleteProductCategoryFormProps) => {
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
      await deleteProductCategoryByProductIdAndCategoryId(productId, category)
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
      const categoriesDataResult = await getAllCategoriesByProductId(productIdInParams)
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
      <div className='max-w-md w-full flex flex-col items-center justify-center border border-opacity-30 border-defaul-dark dark:border-default-light py-4 px-8 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 shadow-2xl  backdrop-blur-sm rounded transition duration-500'>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
          <select
            className='p-2 rounded-xl w-full bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50'
            value={category.toString()}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
          >
            <option className='hidden' value={''}>
              Select a company
            </option>

            {categoriesData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {error && <p className='text-red-500'>{error}</p>}

          <div className='flex flex-row space-x-2 justify-center'>
            <DefaultButton type='submit'>
              <TrashIcon />
              Delete Category
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

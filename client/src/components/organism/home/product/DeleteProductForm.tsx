'use client'

import { deleteProduct } from '@/api/products'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { TrashIcon } from '@/components/atoms/icons/TrashIcon'
import { useToastify } from '@/context/ToastifyProvider'
import { useRouter } from 'next/navigation'

interface DeleteProductFormProps {
  color?: 'btn-primary' | 'btn-secondary' | 'btn-third' | ''
  productId: number
}

export const DeleteProductForm = ({ color = 'btn-primary', productId }: DeleteProductFormProps) => {
  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await deleteProduct(productId)
      notifySuccess('Product delete succesfull', { autoClose: 2500 })
      router.push('/')
    } catch (e) {
      console.log('Error authenticating user', e)
      notifyError('Error deleting Product', { autoClose: 2500 })
    }
  }
  return (
    <>
      <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
        <div className='box-border-shadow'>
          <div className='flex flex-col justify-center items-center space-y-2'>
            <h1 className='text-2xl font-bold'>Delete</h1>
            <h2 className='text-xl'>Are you sure delete this product?</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='flex flex-row space-x-2 justify-center'>
                <DefaultButton color={color} className='w-full' type='submit'>
                  <TrashIcon size='sm' className='me-1' />
                  Delete
                </DefaultButton>
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
      </div>
    </>
  )
}

'user client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { postProduct } from '@/api/products'

interface AddProductsFormProps {
  companyId: number
  userId: string
  toggleForm: () => void
  getData: () => void
}

export const AddProductsForm = ({ companyId, userId, toggleForm, getData }: AddProductsFormProps) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')
  const [descriptionError, setDescriptionError] = useState<string>('')
  const [priceError, setPriceError] = useState<string>('')

  const [error, setError] = useState('')

  const { notifySuccess, notifyError } = useToastify()

  const validateName = (name: string) => {
    const isValid = /^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$/.test(name)
    setNameError(isValid ? '' : 'Invalid name format (Company name example)')
    return isValid
  }

  const validateDescription = (description: string) => {
    const isValid = /^.{1,300}$/.test(description)
    setDescriptionError(isValid ? '' : 'Invalid description format')
    return isValid
  }

  const validatePrice = (price: string) => {
    const isValid = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(price)
    setPriceError(isValid ? '' : 'Invalid price format')
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateName(name)) return
    if (!validateDescription(description)) return
    if (!validatePrice(price)) return

    try {
      await postProduct(companyId, userId, name, description, price)
      notifySuccess('Product registered succesfull', { autoClose: 2500 })
      getData()
    } catch (e) {
      console.log('Error register Product', e)
      setError('Error register Product')
      notifyError('Error register Product', { autoClose: 2500 })
    }
    toggleForm()
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
      <InputForm placeholder='Product Name' value={name} onChange={setName} onBlur={validateName} />
      {nameError && <p className='text-red-500 mt-2'>{nameError}</p>}

      <InputForm placeholder='Description' value={description} onChange={setDescription} onBlur={validateDescription} />
      {descriptionError && <p className='text-red-500 mt-2'>{descriptionError}</p>}

      <InputForm placeholder='Price' value={price} onChange={setPrice} onBlur={validatePrice} />
      {priceError && <p className='text-red-500 mt-2'>{priceError}</p>}

      {error && <p className='text-red-500'>{error}</p>}

      <div className='flex flex-row space-x-2 justify-center'>
        <DefaultButton type='submit'>Add Company</DefaultButton>
        <DefaultButton color='btn-secondary' onClick={toggleForm}>
          Back
        </DefaultButton>
      </div>
    </form>
  )
}

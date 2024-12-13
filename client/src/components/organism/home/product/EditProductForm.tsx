'user client'

import { patchProduct } from '@/api/products'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useCallback, useEffect, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { ProductData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { postProductPrice } from '@/api/productPrices'

interface EditProductFormProps {
  productData: ProductData
  getData: () => void
}

export const EditProductForm = ({ productData, getData }: EditProductFormProps) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [weightUnit, setWeightUnit] = useState<string>('Kg')
  const [quantity, setQuantity] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')
  const [descriptionError, setDescriptionError] = useState<string>('')
  const [priceError, setPriceError] = useState<string>('')
  const [weightError, setWeightError] = useState<string>('')
  const [quantityError, setQuantityError] = useState<string>('')

  const [lastPrice, setLastPrice] = useState<string>('')

  const [error, setError] = useState('')

  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const getEditData = useCallback(async () => {
    setName(productData.name)
    setDescription(productData.description)
    setPrice(String(productData.price))
    setLastPrice(String(productData.price))
    setWeight(String(productData.weight))
    setWeightUnit(productData.weight_unit)
    setQuantity(String(productData.quantity))
  }, [productData])

  const validateName = (name: string) => {
    const isValid = /^.{1,40}$/.test(name)
    setNameError(isValid ? '' : 'Invalid name format only 40 caracters')
    return isValid
  }

  const validateDescription = (description: string) => {
    const isValid = /^.{1,300}$/.test(description)
    setDescriptionError(isValid ? '' : 'Invalid description format only 300 caracters')
    return isValid
  }

  const validatePrice = (price: string) => {
    const isValid = /^\d+(?:\.\d{1,2})?$/.test(price)
    setPriceError(isValid ? '' : 'Invalid price format only numbers and two decimal')
    return isValid
  }

  const validateWeight = (weight: string) => {
    const isValid = /^[0-9]*$/.test(weight)
    setWeightError(isValid ? '' : 'Invalid weight format only numbers')
    return isValid
  }

  const validateQuantity = (quantity: string) => {
    const isValid = /^[0-9]*$/.test(quantity)
    setQuantityError(isValid ? '' : 'Invalid quantity format only numbers')
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateName(name)) return
    if (!validateDescription(description)) return
    if (!validatePrice(price)) return
    if (!validateWeight(weight)) return
    if (!validateQuantity(quantity)) return

    try {
      const patchedProduct = await patchProduct(name, description, price, Number(weight), weightUnit, Number(quantity), productData.id)
      if (price !== lastPrice) await postProductPrice(String(patchedProduct.id), price)

      notifySuccess('Product edited succesfull', { autoClose: 2500 })
      getData()
      router.back()
    } catch (e) {
      console.log('Error editing Product', e)
      setError('Error editing Product')
      notifyError('Error editing Product', { autoClose: 2500 })
    }
  }
  useEffect(() => {
    getEditData()
  }, [getEditData])
  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
      <div className='max-w-md w-full flex flex-col items-center justify-center border border-opacity-30 border-defaul-dark dark:border-default-light py-4 px-8 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 shadow-2xl  backdrop-blur-sm rounded transition duration-500'>
        <h1 className='text-2xl font-bold'>Edit</h1>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
          <InputForm placeholder='Product Name' value={name} onChange={setName} onBlur={validateName} />
          {nameError && <p className='text-red-500 mt-2'>{nameError}</p>}

          <InputForm placeholder='Description' value={description} onChange={setDescription} onBlur={validateDescription} />
          {descriptionError && <p className='text-red-500 mt-2'>{descriptionError}</p>}

          <InputForm placeholder='Price' value={price} type='number' onChange={(value) => setPrice(value)} onBlur={validatePrice} />
          {priceError && <p className='text-red-500 mt-2'>{priceError}</p>}

          <div className='flex flex-row w-full space-x-1'>
            <InputForm placeholder='Weight' value={weight} type='number' onChange={(value) => setWeight(value)} onBlur={validateWeight} />
            <select
              className='text-sm px-2 rounded-xl bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50'
              value={weightUnit}
              onChange={(e) => {
                setWeightUnit(e.target.value)
              }}
            >
              <option value={'Kg'}>Kg</option>
              <option value={'Mg'}>Mg</option>
              <option value={'Lt'}>Lt</option>
              <option value={'ml'}>ml</option>
            </select>
          </div>
          {weightError && <p className='text-red-500 mt-2'>{weightError}</p>}

          <InputForm placeholder='Quantity' value={quantity} type='number' onChange={(value) => setQuantity(value)} onBlur={validateQuantity} />
          {quantityError && <p className='text-red-500 mt-2'>{quantityError}</p>}

          {error && <p className='text-red-500'>{error}</p>}

          <div className='flex flex-row space-x-2 justify-center'>
            <DefaultButton type='submit'>Edit Product</DefaultButton>
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

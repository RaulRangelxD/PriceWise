'user client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useCallback, useEffect, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { postProduct } from '@/api/products'
import { getAllCompaniesByUserId } from '@/api/companies'
import Loading from '@/app/Loading'
import { CompanyData } from '@/lib/types'

interface AddProductFormProps {
  companyIdInParams?: number
}

export const AddProductForm = ({ companyIdInParams }: AddProductFormProps) => {
  const [companiesData, setCompaniesData] = useState<CompanyData[] | null>(null)
  const [companyId, setCompanyId] = useState<number>(0)
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

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const { userInContext } = useAuth()
  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

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
    const isValid = /^[0-9]*$/.test(price)
    setPriceError(isValid ? '' : 'Invalid price format only numbers')
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
      if (!userInContext) return
      await postProduct(Number(companyId), userInContext.id, name, description, Number(price), Number(weight), weightUnit, Number(quantity))
      notifySuccess('Product registered succesfull', { autoClose: 2500 })
      setError('')
      router.back()
    } catch (e) {
      console.log('Error register Product', e)
      setError('Error register Product')
      notifyError('Error register Product', { autoClose: 2500 })
    }
  }

  const getData = useCallback(async () => {
    try {
      if (!userInContext) return
      if (!companyIdInParams) {
        const companiesDataResult = await getAllCompaniesByUserId(userInContext.id)
        setCompaniesData(companiesDataResult)
        setLoading(false)
        return
      }
      if (companyIdInParams) setCompanyId(companyIdInParams)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [companyIdInParams, userInContext])

  useEffect(() => {
    getData()
  }, [getData])

  return !loading ? (
    <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
      <div className='max-w-md w-full flex flex-col items-center justify-center border border-opacity-30 border-defaul-dark dark:border-default-light py-4 px-8 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 shadow-2xl  backdrop-blur-sm rounded transition duration-500'>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
          {!companiesData ? (
            ''
          ) : (
            <select
              className='text-sm px-2 rounded-xl bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50'
              value={companyId.toString()}
              onChange={(e) => {
                setCompanyId(Number(e.target.value))
              }}
            >
              <option className='hidden' value={''}>
                Select a company
              </option>

              {companiesData.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          )}
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
            <DefaultButton type='submit'>Add Product</DefaultButton>
            <DefaultButton
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
  ) : (
    <Loading msg='Loading Data' />
  )
}

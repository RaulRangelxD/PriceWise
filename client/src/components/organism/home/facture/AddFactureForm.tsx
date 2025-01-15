'user client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useCallback, useEffect, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { patchFactureTotalAmount, postFacture } from '@/api/factures'
import Loading from '@/app/Loading'
import { FactureData, ProductData } from '@/lib/types'
import { BackIcon, PlusIcon } from '@/components/atoms/icons'
import { postFactureProduct } from '@/api/factureProducts'
import { DateInput } from '@/components/atoms/inputs/DateInput'
import { SelectInput } from '@/components/atoms/inputs/SelectInput'

interface AddFactureFormProps {
  companyIdInParams?: number
  productsData?: ProductData[]
}

export const AddFactureForm = ({ companyIdInParams, productsData }: AddFactureFormProps) => {
  const [factureData, setFactureData] = useState<FactureData | null>(null)
  const [companyId, setCompanyId] = useState<number>(0)
  const [date, setDate] = useState<string>('')
  const [productId, setProductId] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [total, setTotal] = useState<number>(0)
  const [productsList, setProductsList] = useState<ProductData[] | null>(null)
  const [productsListQuantity, setProductsListQuantity] = useState<string[] | null>(null)

  const [dateError, setDateError] = useState<string>('')
  const [quantityError, setQuantityError] = useState<string>('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const { userInContext } = useAuth()
  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const validateDate = (date: string) => {
    const isValid = /^.{1,300}$/.test(date)
    setDateError(isValid ? '' : 'Invalid date format only 300 caracters')
    return isValid
  }

  const validateQuantity = (quantity: string) => {
    const isValid = /^[0-9]*$/.test(quantity)
    setQuantityError(isValid ? '' : 'Invalid quantity format only numbers')
    return isValid
  }

  const handleSubmitFacture = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateDate(date)) return
    try {
      if (!userInContext) return
      const postedFacture = await postFacture(userInContext.id, Number(companyId), '0', date)
      setFactureData(postedFacture)
      notifySuccess('Date registered succesfull', { autoClose: 2500 })
      setError('')
    } catch (e) {
      console.log('Error register Date', e)
      setError('Error register Date')
      notifyError('Error register Date', { autoClose: 2500 })
    }
  }

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateQuantity(quantity)) return
    try {
      if (!userInContext) return
      if (!factureData) return
      if (!productsData) return

      const actualProduct = productsData.filter((product) => {
        return Number(product.id) === Number(productId)
      })[0]

      const totalPrice = Number(quantity) * Number(actualProduct.price)

      if (!productsList) {
        setProductsList(Array(actualProduct))
        setProductsListQuantity(Array(quantity))
      } else {
        productsList.push(actualProduct)
        productsListQuantity?.push(quantity)
      }

      setTotal(total + totalPrice)
      await postFactureProduct(factureData.id, Number(productId), Number(quantity), totalPrice)
      notifySuccess('Product registered succesfull', { autoClose: 2500 })
      setQuantity('')
      setError('')
    } catch (e) {
      console.log('Error register Product', e)
      setError('Error register Product')
      notifyError('Error register Product', { autoClose: 2500 })
    }
  }

  const handleSubmitTotal = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!userInContext) return
      if (!factureData) return
      await patchFactureTotalAmount(factureData.id, total)
      notifySuccess('facture registered succesfull', { autoClose: 2500 })
      setQuantity('')
      setError('')
      router.back()
    } catch (e) {
      console.log('Error register facture', e)
      setError('Error register facture')
      notifyError('Error register facture', { autoClose: 2500 })
    }
  }

  const getData = useCallback(async () => {
    try {
      if (!userInContext) return
      if (companyIdInParams) {
        setCompanyId(companyIdInParams)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [companyIdInParams, userInContext])

  useEffect(() => {
    getData()
  }, [getData])

  return !loading ? (
    <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
      <div className='box-border-shadow'>
        <div className='flex flex-row space-x-2 justify-start w-full'>
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
        {!factureData ? (
          <form id='form-facture' onSubmit={(e) => handleSubmitFacture(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
            <DateInput placeholder='Date' value={date} onChange={setDate} onBlur={validateDate} />
            {dateError && <p className='text-red-500 mt-2'>{dateError}</p>}

            {error && <p className='text-red-500'>{error}</p>}

            <div className='flex flex-row space-x-2 justify-center'>
              <DefaultButton type='submit'>
                <PlusIcon />
                Select Date
              </DefaultButton>
            </div>
          </form>
        ) : (
          <>
            <p>{date}</p>
            <form id='form-facture-product' onSubmit={(e) => handleSubmitProduct(e)} className='w-full flex flex-col space-y-4 px-4 pt-8 pb-2 items-center'>
              {productsData ? (
                <SelectInput
                  value={productId.toString()}
                  onChange={(value) => setProductId(value)}
                  className='w-full rounded-t-xl focus:bg-default-light focus:dark:bg-default-dark focus:bg-opacity-50 focus:dark:bg-opacity-50'
                  options={productsData.map((product) => ({
                    value: product.id,
                    name: product.name,
                  }))}
                  placeholder='Select a product'
                />
              ) : (
                <p>No products</p>
              )}

              <InputForm placeholder='Quantity' value={quantity} type='number' onChange={(value) => setQuantity(value)} onBlur={validateQuantity} />
              {quantityError && <p className='text-red-500 mt-2'>{quantityError}</p>}

              {dateError && <p className='text-red-500 mt-2'>{dateError}</p>}

              {error && <p className='text-red-500'>{error}</p>}

              <div className='flex flex-row space-x-2 justify-center'>
                <DefaultButton type='submit'>
                  <PlusIcon />
                  Add Product
                </DefaultButton>
              </div>
            </form>
            {!productsList ? (
              ''
            ) : (
              <div className='overflow-x-auto rounded'>
                <table className='w-full table-auto'>
                  <thead>
                    <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-default-light dark:border-default-dark'>
                      <th className='px-2 py-2 text-left'>
                        <h3>Name</h3>
                      </th>
                      <th className='px-2 py-2 text-left'>
                        <h3>Quantity</h3>
                      </th>
                      <th className='px-2 py-2 text-left'>
                        <h3>Total</h3>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsList.map((product, index) => (
                      <tr
                        key={product.id}
                        className={`${
                          index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                        } w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group`}
                      >
                        <td className='px-2 py-2 text-nowrap'>{product.name}</td>
                        {!productsListQuantity ? (
                          ''
                        ) : (
                          <>
                            <td className='px-2 py-2 text-nowrap'>{productsListQuantity[index]}</td>
                            <td className='px-2 py-2 text-nowrap'>{(product.price * Number(productsListQuantity[index])).toFixed(2)}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className='flex justify-end bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50 p-2'>Total: {total}</p>
              </div>
            )}
            <form id='form-save-facture' onSubmit={(e) => handleSubmitTotal(e)} className='w-full flex flex-col'>
              <div className='flex flex-row space-x-2 justify-center py-2'>
                <DefaultButton type='submit'>
                  <PlusIcon />
                  Save
                </DefaultButton>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  ) : (
    <Loading msg='Loading Data' />
  )
}

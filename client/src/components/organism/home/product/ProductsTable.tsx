import { DefaultButton } from '@/components/atoms/buttons/Button'
import { ProductData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { getAllProductsByCategoryIdAndPagination, getAllProductsByCompanyIdAndPagination, getAllProductsByUserIdAndPagination } from '@/api/products'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'
import { LeftIcon, RightIcon } from '@/components/atoms/icons'

interface ProductsTableProps {
  companyIdInParams?: number
  categoryIdInParams?: string
  rows: number[]
  rowsDefault: number
}

export const ProductsTable = ({ companyIdInParams, categoryIdInParams, rows, rowsDefault }: ProductsTableProps) => {
  const { userInContext } = useAuth()
  const router = useRouter()
  const [productsData, setProductsData] = useState<ProductData[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowsDefault)
  const [placeholder, setPlaceholder] = useState(true)

  const [loading, setLoading] = useState(true)

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') setCurrentPage((prev) => prev + 1)
    if (direction === 'prev' && currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleOnClick = (id: number) => (!placeholder ? router.push(`/product/${id}`) : console.log('Clicked on placeholder product'))

  const tablePlaceholder = useCallback(() => {
    setProductsData([
      {
        id: 1,
        user_id: 'x',
        company_id: 1,
        name: 'Product example 1',
        description: 'Product example 1 description',
        price: 1.7,
        weight: 1,
        weight_unit: 'kg',
        quantity: 1,
        create_at: '1999-31-12 00:00:00',
        update_at: '1999-31-12 00:00:00',
        categories: '',
      },
      {
        id: 2,
        user_id: 'x',
        company_id: 1,
        name: 'Product example 2',
        description: 'Product example 2 description',
        price: 1.7,
        weight: 1,
        weight_unit: 'kg',
        quantity: 1,
        create_at: '1999-31-12 00:00:00',
        update_at: '1999-31-12 00:00:00',
        categories: '',
      },
      {
        id: 3,
        user_id: 'x',
        company_id: 1,
        name: 'Product example 3',
        description: 'Product example 3 description',
        price: 1.7,
        weight: 1,
        weight_unit: 'kg',
        quantity: 1,
        create_at: '1999-31-12 00:00:00',
        update_at: '1999-31-12 00:00:00',
        categories: '',
      },
    ])
  }, [])

  const getData = useCallback(async () => {
    try {
      if (!userInContext) {
        tablePlaceholder()
        setPlaceholder(true)
        setLoading(false)
        return
      }
      if (!companyIdInParams) {
        const productsDataResult: ProductData[] = await getAllProductsByUserIdAndPagination(userInContext.id, rowsPerPage, currentPage - 1)
        if (productsDataResult.length < 1 && currentPage > 1) return setCurrentPage(currentPage - 1)
        setProductsData(productsDataResult)
        setPlaceholder(false)
        setLoading(false)
        return
      }
      if (companyIdInParams) {
        const productsDataResult = await getAllProductsByCompanyIdAndPagination(companyIdInParams, rowsPerPage, currentPage - 1)
        if (productsDataResult.length < 1 && currentPage > 1) return setCurrentPage(currentPage - 1)
        setProductsData(productsDataResult)
        setPlaceholder(false)
        setLoading(false)
      }
      if (categoryIdInParams) {
        const productsDataResult = await getAllProductsByCategoryIdAndPagination(categoryIdInParams, rowsPerPage, currentPage - 1)
        if (productsDataResult.length < 1 && currentPage > 1) return setCurrentPage(currentPage - 1)
        setProductsData(productsDataResult)
        setPlaceholder(false)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [userInContext, companyIdInParams, categoryIdInParams, tablePlaceholder, rowsPerPage, currentPage])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className='mt-8 flex flex-col w-full justify-center items-center space-y-2'>
      <div className='flex flex-row w-full justify-end '>
        <div className='bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50 rounded-xl ps-1'>
          <span>Rows per page: </span>
          <select className='text-sm py-1 px-2 rounded-xl ms-1 bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' value={rowsPerPage} onChange={handleRowsChange}>
            {rows.map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='overflow-x-auto w-full rounded-xl'>
        {!loading ? (
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-default-light dark:border-default-dark'>
                <th className='px-2 py-2 text-left'>
                  <h3>Product Name</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Description</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Price</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>U/P</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Categories</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Weight</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Quantity</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {productsData?.map((product, index) => (
                <tr
                  key={product.id}
                  onClick={() => handleOnClick(product.id)}
                  className={`${
                    index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                  } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${index !== productsData.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''}`}
                >
                  <td className='px-2 py-2 text-nowrap'>
                    <p>{product.name}</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{product.description}</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{product.price}$</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{product.price / product.quantity}$</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{product.categories}</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>
                      {product.weight}
                      <span> </span>
                      {product.weight_unit}
                    </p>
                  </td>

                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{product.quantity}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='flex justify-center items-center w-full h-60'>
            <Loading msg='Loading Data' />
          </div>
        )}
      </div>
      <div className='flex flex-row justify-center items-center space-x-2 w-full'>
        <div className='flex items-center text-sm py-1 px-2 rounded-xl ms-1 bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50'>
          <span>Page:</span>
          <span className='ms-1'>{currentPage}</span>
        </div>
        <div className='grow'></div>
        <DefaultButton size='md' color='btn-secondary' onClick={() => handlePageChange('prev')}>
          <LeftIcon size='sm' />
          Previous
        </DefaultButton>
        <DefaultButton size='md' color='btn-secondary' onClick={() => handlePageChange('next')}>
          Next
          <RightIcon size='sm' />
        </DefaultButton>
      </div>
    </div>
  )
}

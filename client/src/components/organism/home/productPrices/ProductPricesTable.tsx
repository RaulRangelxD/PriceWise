import { DefaultButton } from '@/components/atoms/buttons/Button'
import { ProductPriceData } from '@/lib/types'
// import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { getAllProductPricesByProductIdAndPagination } from '@/api/productPrices'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'
import { LeftIcon, RightIcon } from '@/components/atoms/icons'
import { GraphicsProductPrices } from './GraphicsProductPrices'

interface ProductsPriceTableProps {
  productIdInParams?: string
  rows: number[]
  rowsDefault: number
}

export const ProductsPriceTable = ({ productIdInParams, rows, rowsDefault }: ProductsPriceTableProps) => {
  const { userInContext } = useAuth()
  // const router = useRouter()
  const [productsData, setProductsData] = useState<ProductPriceData[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(rowsDefault)

  const [loading, setLoading] = useState(true)

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') setCurrentPage((prev) => prev + 1)
    if (direction === 'prev' && currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleOnClick = (id: number) => console.log(`Clicked on productPrices ${id}`)

  const getData = useCallback(async () => {
    try {
      if (!userInContext) {
        setLoading(false)
        return
      }
      if (productIdInParams) {
        const productsDataResult = await getAllProductPricesByProductIdAndPagination(productIdInParams, rowsPerPage, currentPage - 1)
        if (productsDataResult.length < 1 && currentPage > 1) return setCurrentPage(currentPage - 1)
        setProductsData(productsDataResult)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [userInContext, productIdInParams, rowsPerPage, currentPage])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className='flex flex-row flex-wrap justify-center items-center'>
      <div className='mt-8 flex flex-col max-w-xs justify-center items-center space-y-2'>
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
                    <h3>Price</h3>
                  </th>
                  <th className='px-2 py-2 text-left'>
                    <h3>Price Difference</h3>
                  </th>
                  <th className='px-2 py-2 text-left'>
                    <h3>Percentage Difference</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsData?.map((product, index) => {
                  const prevProduct = productsData[index + 1] // Compare with the previous product
                  const priceDifference = prevProduct ? Number(product.price) - Number(prevProduct.price) : 0
                  const percentageDifference = prevProduct ? ((Number(product.price) - Number(prevProduct.price)) / Number(prevProduct.price)) * 100 : 0

                  return (
                    <tr
                      key={product.id}
                      onClick={() => handleOnClick(product.id)}
                      className={`${
                        index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                      } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${index !== productsData.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''}`}
                    >
                      <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                        <p className='text-ellipsis overflow-hidden'>{product.price}$</p>
                      </td>
                      <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                        {priceDifference === null ? (
                          <p className='text-gray-500 italic'>N/A</p>
                        ) : (
                          <p className={`${priceDifference > 0 ? 'text-red-800 dark:text-red-500' : 'text-green-800 dark:text-green-500'}`}>{priceDifference.toFixed(2)}$</p>
                        )}
                      </td>
                      <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                        {percentageDifference === null ? (
                          <p className='text-gray-500 italic'>N/A</p>
                        ) : (
                          <p className={`${percentageDifference > 0 ? 'text-red-800 dark:text-red-500' : 'text-green-800 dark:text-green-500'}`}>{percentageDifference.toFixed(2)}%</p>
                        )}
                      </td>
                    </tr>
                  )
                })}
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
          <DefaultButton size='md' color='btn-primary' onClick={() => handlePageChange('prev')}>
            <LeftIcon size='sm' />
            Previous
          </DefaultButton>
          <DefaultButton size='md' color='btn-primary' onClick={() => handlePageChange('next')}>
            Next
            <RightIcon size='sm' />
          </DefaultButton>
        </div>
      </div>
      <div className='max-w-xl w-full'>{productsData ? <GraphicsProductPrices productsData={productsData} /> : <Loading msg='Loading data' />}</div>
    </div>
  )
}

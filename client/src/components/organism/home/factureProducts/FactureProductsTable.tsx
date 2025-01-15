import { DefaultButton } from '@/components/atoms/buttons/Button'
import { FactureProductData } from '@/lib/types'
import { useAuth } from '@/context/AuthProvider'
import { getAllFactureProductsByFactureIdAndPagination } from '@/api/factureProducts'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'
import { LeftIcon, RightIcon } from '@/components/atoms/icons'

interface FacturesProductTableProps {
  factureIdInParams?: string
  rows: number[]
  rowsDefault: number
}

export const FacturesProductTable = ({ factureIdInParams, rows, rowsDefault }: FacturesProductTableProps) => {
  const { userInContext } = useAuth()
  const [facturesData, setFacturesData] = useState<FactureProductData[] | null>(null)
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

  const handleOnClick = (id: number) => console.log(`Clicked on factureProducts ${id}`)

  const getData = useCallback(async () => {
    try {
      if (!userInContext) {
        setLoading(false)
        return
      }
      if (factureIdInParams) {
        const facturesDataResult = await getAllFactureProductsByFactureIdAndPagination(factureIdInParams, rowsPerPage, currentPage - 1)
        if (facturesDataResult.length < 1 && currentPage > 1) return setCurrentPage(currentPage - 1)
        setFacturesData(facturesDataResult)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [userInContext, factureIdInParams, rowsPerPage, currentPage])

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
      <div className='table-border-shadow'>
        {!loading ? (
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-primary'>
                <th className='px-2 py-2 text-left'>
                  <h3>Product name</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Price</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Quantity</h3>
                </th>
                <th className='px-2 py-2 text-left'>
                  <h3>Total Price</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {facturesData?.map((facture, index) => (
                <tr
                  key={facture.id}
                  onClick={() => handleOnClick(facture.id)}
                  className={`${
                    index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                  } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${index !== facturesData.length - 1 ? 'border-b border-primary' : ''}`}
                >
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{facture.product_name}</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{facture.product_price}</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{facture.quantity}</p>
                  </td>
                  <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                    <p className='text-ellipsis overflow-hidden'>{facture.total_price}$</p>
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

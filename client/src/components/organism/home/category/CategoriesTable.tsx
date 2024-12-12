import { DefaultButton } from '@/components/atoms/buttons/Button'
import { CategoryData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { getAllCategoriesByUserIdAndPagination } from '@/api/categories'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'
import { LeftIcon, RightIcon } from '@/components/atoms/icons'

interface CategoriesTable {
  rows: number[]
  rowsDefault: number
}

export const CategoriesTable = ({ rows, rowsDefault }: CategoriesTable) => {
  const { userInContext } = useAuth()
  const router = useRouter()
  const [categoryData, setCategoryData] = useState<CategoryData[] | null>(null)
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

  const handleOnClick = (id: number) => (!placeholder ? router.push(`/category/${id}`) : console.log('Clicked on placeholder category'))

  const tablePlaceholder = useCallback(() => {
    setCategoryData([
      {
        id: 1,
        user_id: 'x',
        name: 'Category example 1',
        create_at: '1999-31-12 00:00:00',
        update_at: '1999-31-12 00:00:00',
      },
      {
        id: 2,
        user_id: 'x',
        name: 'Category example 2',
        create_at: '1999-31-12 00:00:00',
        update_at: '1999-31-12 00:00:00',
      },
      {
        id: 3,
        user_id: 'x',
        name: 'Category example 3',
        create_at: '1999-31-12 00:00:00',
        update_at: '1999-31-12 00:00:00',
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
      const categoriesDataResult = await getAllCategoriesByUserIdAndPagination(userInContext.id, rowsPerPage, currentPage - 1)
      if (categoriesDataResult.length < 1 && currentPage > 1) return setCurrentPage(currentPage - 1)
      setCategoryData(categoriesDataResult)
      setPlaceholder(false)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [userInContext, rowsPerPage, currentPage, tablePlaceholder])

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
                  <h3>Category Name</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryData?.map((category, index) => (
                <tr
                  key={category.id}
                  onClick={() => handleOnClick(category.id)}
                  className={`${
                    index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                  } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${index !== categoryData.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''}`}
                >
                  <td className='px-2 py-2 text-nowrap'>
                    <p>{category.name}</p>
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
  )
}

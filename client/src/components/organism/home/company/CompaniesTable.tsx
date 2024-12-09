import { DefaultButton } from '@/components/atoms/buttons/Button'
import { CompanyData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { getAllCompaniesByUserIdAndPagination } from '@/api/companies'
import { useCallback, useEffect, useState } from 'react'
import Loading from '@/app/Loading'

export const CompaniesTable = () => {
  const falseData = [
    {
      id: 1,
      user_id: 'x',
      name: 'Company example 1',
      rif: 'J-123456789',
      phone: '1234-1234567',
      address: 'John Smith, 999 Anywhere St., Apt 555, Medford MA 02155',
      create_at: '1999-31-12 00:00:00',
      update_at: '1999-31-12 00:00:00',
    },
    {
      id: 2,
      user_id: 'x',
      name: 'Company example 2',
      rif: 'J-123456789',
      phone: '1234-1234567',
      address: 'John Smith, 999 Anywhere St., Apt 555, Medford MA 02155',
      create_at: '1999-31-12 00:00:00',
      update_at: '1999-31-12 00:00:00',
    },
    {
      id: 3,
      user_id: 'x',
      name: 'Company example 3',
      rif: 'J-123456789',
      phone: '1234-1234567',
      address: 'John Smith, 999 Anywhere St., Apt 555, Medford MA 02155',
      create_at: '1999-31-12 00:00:00',
      update_at: '1999-31-12 00:00:00',
    },
  ]
  const { userInContext } = useAuth()
  const router = useRouter()
  const [companyData, setCompanyData] = useState<CompanyData[] | null>(falseData)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const [loading, setLoading] = useState(true)

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') setCurrentPage((prev) => prev + 1)
    if (direction === 'prev' && currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  const getData = useCallback(async () => {
    try {
      if (!userInContext) {
        setLoading(false)
        return
      }
      const companiesDataResult = await getAllCompaniesByUserIdAndPagination(userInContext.id, rowsPerPage, currentPage - 1)
      if (companiesDataResult.length < 1 && currentPage > 1) return setCurrentPage(currentPage - 1)
      setCompanyData(companiesDataResult)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }, [userInContext, rowsPerPage, currentPage])

  useEffect(() => {
    getData()
  }, [getData])

  return !loading ? (
    <div className='mt-8 flex flex-col w-full justify-center items-center space-y-2'>
      <h2 className='text-3xl font-bold'>Companies</h2>
      <div className='flex flex-row w-full justify-end '>
        <div className='bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50 rounded-xl ps-1'>
          <span>Rows per page: </span>
          <select className='text-sm py-1 px-2 rounded-xl ms-1 bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' value={rowsPerPage} onChange={handleRowsChange}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>
      <div className='overflow-x-auto w-full rounded-xl'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-default-light dark:border-default-dark'>
              <th className='px-4 py-2 text-left'>
                <h3>Company Name</h3>
              </th>
              <th className='px-4 py-2 text-left'>
                <h3>Rif</h3>
              </th>
              <th className='px-4 py-2 text-left'>
                <h3>Phone</h3>
              </th>
              <th className='px-4 py-2 text-left'>
                <h3>Address</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {companyData?.map((company, index) => (
              <tr
                key={company.id}
                onClick={() => {
                  router.push(`/company/${company.id}`)
                }}
                className={`${
                  index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${index !== companyData.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''}`}
              >
                <td className='px-2 py-2 text-nowrap'>
                  <p>{company.name}</p>
                </td>
                <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                  <p className='text-ellipsis overflow-hidden'>{company.rif}</p>
                </td>
                <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                  <p className='text-ellipsis overflow-hidden'>{company.phone}</p>
                </td>
                <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                  <p className='text-ellipsis overflow-hidden'>{company.address}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row justify-center items-center space-x-2 w-full'>
        <div className='flex items-center text-sm py-1 px-2 rounded-xl ms-1 bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50'>
          <span>Page:</span>
          <span className='ms-1'>{currentPage}</span>
        </div>
        <div className='grow'></div>
        <DefaultButton size='md' color='btn-primary' onClick={() => handlePageChange('prev')}>
          Previous
        </DefaultButton>
        <DefaultButton size='md' color='btn-primary' onClick={() => handlePageChange('next')}>
          Next
        </DefaultButton>
      </div>
    </div>
  ) : (
    <Loading msg='Loading Data' />
  )
}

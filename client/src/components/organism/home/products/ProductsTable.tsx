import { DefaultButton } from '@/components/atoms/buttons/Button'
import { EditIcon } from '@/components/atoms/icons/Edit'
import { EyeIcon } from '@/components/atoms/icons/EyeIcon'
import { ProductData } from '@/lib/types'
import { DeleteCompanyForm } from './company/DeleteCompanyForm'

interface ProductsTableProps {
  productsData: ProductData[]
  currentPage: number
  rowsPerPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  getData: () => void
  placeholder: boolean
}

export const ProductsTable = ({ productsData, currentPage, rowsPerPage, setCurrentPage, setRowsPerPage, getData, placeholder }: ProductsTableProps) => {
  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') setCurrentPage((prev) => prev + 1)
    if (direction === 'prev' && currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <div className='mt-8 flex flex-col w-full justify-center items-center space-y-2'>
      <h2 className='text-3xl font-bold'>Products</h2>
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
      <div className='overflow-x-auto w-full rounded-xl bg-default-light dark:bg-default-dark bg-opacity-10 dark:bg-opacity-10'>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-default-light dark:border-default-dark'>
              <th className='px-4 py-2 text-left'>
                <h3>Product Name</h3>
              </th>
              <th className='px-4 py-2 text-left'>
                <h3>Description</h3>
              </th>
              <th className='px-4 py-2 text-left'>
                <h3>Price</h3>
              </th>

              <th className='px-4 py-2 text-left'>
                <h3>Functions</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {productsData?.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                } hover:bg-opacity-75 dark:hover:bg-opacity-75 ${index !== productsData.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''}`}
              >
                <td className='px-2 py-2 text-nowrap'>
                  <p>{product.name}</p>
                </td>
                <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                  <p className='text-ellipsis overflow-hidden'>{product.description}</p>
                </td>
                <td className='px-2 py-2 text-nowrap max-w-20 md:max-w-36 lg:max-w-60'>
                  <p className='text-ellipsis overflow-hidden'>{product.price}</p>
                </td>

                <td className='px-2 py-2 text-nowrap flex flex-row max-w-min'>
                  {!placeholder ? (
                    <>
                      <DefaultButton size='sm' color='btn-third'>
                        <EyeIcon size='sm' />
                      </DefaultButton>
                      <DefaultButton onClick={() => {}} size='sm' color='btn-third'>
                        <EditIcon size='sm' />
                      </DefaultButton>
                      <DeleteCompanyForm color='btn-third' companyId={product.id} getData={getData} />
                    </>
                  ) : (
                    ''
                  )}
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
  )
}

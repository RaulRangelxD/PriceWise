import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { SearchIcon, XIcon } from '@/components/atoms/icons'
import { searchInCategories, searchInCompanies, searchInProducts } from '@/api/search'
import { CategoryData, CompanyData, ProductData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import * as Dialog from 'toldo'
import Loading from '@/app/Loading'
import { SelectInput } from '../atoms/inputs/SelectInput'

export const Search = () => {
  const [searchTarget, setSearchTarget] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [resultsCompanies, setResultsCompanies] = useState<CompanyData[]>([])
  const [resultsProducts, setResultsProducts] = useState<ProductData[]>([])
  const [resultsCategories, setResultsCategories] = useState<CategoryData[]>([])

  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { userInContext } = useAuth()
  const router = useRouter()
  const { notifyError } = useToastify()

  const validateSearch = (name: string) => {
    const isValid = name.length >= 1 && name.length <= 40 && /^[^,]+$/.test(name)
    setSearchError(isValid ? '' : 'Invalid search. Use 1–40 characters and avoid commas.')
    if (!isValid) {
      setResultsCompanies([])
      setResultsProducts([])
      setResultsCategories([])
    }
    return isValid
  }

  const handleChangeSearchTarget = (text: string) => {
    setResultsCompanies([])
    setResultsProducts([])
    setResultsCategories([])
    setSearchTarget(text)
  }

  const fetchResults = useCallback(
    async (query: string) => {
      if (!validateSearch(query)) return

      setSearchLoading(true)
      try {
        if (!userInContext || !query) return
        setIsModalOpen(true)

        if (searchTarget === 'all' || searchTarget === 'companies') {
          const companiesSearch = await searchInCompanies(userInContext.id, query)
          setResultsCompanies(companiesSearch)
        }
        if (searchTarget === 'all' || searchTarget === 'products') {
          const productsSearch = await searchInProducts(userInContext.id, query)
          setResultsProducts(productsSearch)
        }
        if (searchTarget === 'all' || searchTarget === 'categories') {
          const categoriesSearch = await searchInCategories(userInContext.id, query)
          setResultsCategories(categoriesSearch)
        }
        setError('')
      } catch (e) {
        console.error('Error searching', e)
        setError('Error searching. Please try again.')
        notifyError('Error searching', { autoClose: 2500 })
      } finally {
        setSearchLoading(false)
      }
    },
    [notifyError, searchTarget, userInContext]
  )

  const handleOnClickCompany = (id: number) => {
    setIsModalOpen(false)
    router.push(`/company/${id}`)
  }

  const handleOnClickProduct = (id: number) => {
    setIsModalOpen(false)
    router.push(`/product/${id}`)
  }

  const handleOnClickCategory = (id: number) => {
    setIsModalOpen(false)
    router.push(`/category/${id}`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSearch(search)) return
    await fetchResults(search)
  }

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      if (validateSearch(search)) {
        fetchResults(search)
      }
    }, 300)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [searchTarget, search, fetchResults])

  return (
    <div className='flex flex-col w-full'>
      <form onSubmit={handleSubmit} className='w-full flex flex-row items-end'>
        <div className='flex flex-col w-full'>
          <InputForm
            placeholder='Search'
            className='focus:bg-default-light focus:dark:bg-default-dark focus:bg-opacity-50 focus:dark:bg-opacity-50 rounded-tl-xl'
            value={search}
            onChange={setSearch}
          />
        </div>
        <SelectInput
          value={searchTarget}
          onChange={handleChangeSearchTarget}
          className='w-auto rounded-tr-xl focus:bg-default-light focus:dark:bg-default-dark focus:bg-opacity-50 focus:dark:bg-opacity-50'
          options={[
            { value: 'all', name: 'All' },
            { value: 'companies', name: 'Companies' },
            { value: 'products', name: 'Products' },
            { value: 'categories', name: 'Categories' },
          ]}
        />
        <DefaultButton type='button' onClick={() => setIsModalOpen(true)} color='btn-transparent'>
          <SearchIcon size='sm' />
        </DefaultButton>
      </form>

      <Dialog.Root modal={false} open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0' />
          <Dialog.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex flex-col items-center justify-center border border-opacity-30 border-default-dark dark:border-default-light bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 backdrop-blur-sm rounded-md transition duration-500 mt-4 p-1 min-w-40'
          >
            <Dialog.Title className='px-6 pt-5 font-bold text-foreground text-large'>Search</Dialog.Title>
            {searchError && <p className='text-red-500 mt-2'>{searchError}</p>}
            {error && <p className='text-red-500'>{error}</p>}

            {searchLoading ? (
              <Loading msg='Searching' />
            ) : resultsProducts.length > 0 || resultsCompanies.length > 0 || resultsCategories.length > 0 ? (
              <div className='p-4'>
                {searchTarget === 'all' || searchTarget === 'products' ? (
                  resultsProducts.length > 0 ? (
                    <div className='flex flex-col w-full justify-center items-center'>
                      <h3>Products</h3>
                      <div className='mx-2 my-0.5 overflow-x-auto w-full rounded-xl'>
                        <table className='w-full table-auto'>
                          <thead>
                            <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-default-light dark:border-default-dark'>
                              <th className='px-2 py-2 text-left'>
                                <h3>Name</h3>
                              </th>
                              <th className='px-2 py-2 text-left'>
                                <h3>Price</h3>
                              </th>
                              <th className='px-2 py-2 text-left'>
                                <h3>Quantity</h3>
                              </th>
                              <th className='px-2 py-2 text-left'>
                                <h3>U/P</h3>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultsProducts.map((product, index) => (
                              <tr
                                key={product.id}
                                onClick={() => handleOnClickProduct(product.id)}
                                className={`${
                                  index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                                } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${
                                  index !== resultsProducts.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''
                                }`}
                              >
                                <td>
                                  <p className='px-2 py-2'>{product.name}</p>
                                </td>
                                <td>
                                  <p className='px-2 py-2'>{product.price}</p>
                                </td>
                                <td>
                                  <p className='px-2 py-2'>{product.quantity}</p>
                                </td>
                                <td>
                                  <p className='px-2 py-2'>{(product.price / product.quantity).toFixed(2)}$</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null
                ) : null}
                {searchTarget === 'all' || searchTarget === 'companies' ? (
                  resultsCompanies.length > 0 ? (
                    <div className='flex flex-col w-full justify-center items-center'>
                      <h3>Companies</h3>
                      <div className='mx-2 my-0.5 overflow-x-auto w-full rounded-xl'>
                        <table className='w-full table-auto'>
                          <thead>
                            <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-default-light dark:border-default-dark'>
                              <th className='px-2 py-2 text-left'>
                                <h3>Name</h3>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultsCompanies.map((company, index) => (
                              <tr
                                key={company.id}
                                onClick={() => handleOnClickCompany(company.id)}
                                className={`${
                                  index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                                } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${
                                  index !== resultsCompanies.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''
                                }`}
                              >
                                <td>
                                  <p className='px-2 py-2'>{company.name}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null
                ) : null}

                {searchTarget === 'all' || searchTarget === 'categories' ? (
                  resultsCategories.length > 0 ? (
                    <div className='flex flex-col w-full justify-center items-center'>
                      <h3>Categories</h3>
                      <div className='mx-2 my-0.5 overflow-x-auto w-full rounded-xl'>
                        <table className='w-full table-auto'>
                          <thead>
                            <tr className='bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 border-b border-default-light dark:border-default-dark'>
                              <th className='px-2 py-2 text-left'>
                                <h3>Name</h3>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultsCategories.map((category, index) => (
                              <tr
                                key={category.id}
                                onClick={() => handleOnClickCategory(category.id)}
                                className={`${
                                  index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                                } relative w-full hover:bg-opacity-75 dark:hover:bg-opacity-75 group ${
                                  index !== resultsCategories.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''
                                }`}
                              >
                                <td>
                                  <p className='px-2 py-2'>{category.name}</p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null
                ) : null}
              </div>
            ) : (
              <p>No results</p>
            )}
            <DefaultButton color='btn-transparent' onClick={() => setIsModalOpen(false)}>
              <XIcon />
            </DefaultButton>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

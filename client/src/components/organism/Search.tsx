import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { SetStateAction, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { SearchIcon, XIcon } from '@/components/atoms/icons'
import { searchInTable } from '@/api/search'
import { CategoryData, CompanyData, ProductData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import * as Dialog from 'toldo'
import Loading from '@/app/Loading'

interface SearchProps {
  companies?: boolean
  products?: boolean
  categories?: boolean
}

type SearchResult = (ProductData | CategoryData | CompanyData) & { table: string }

export const Search = ({ companies, products, categories }: SearchProps) => {
  const [search, setSearch] = useState<string>('')
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<string>('')
  const [error, setError] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { userInContext } = useAuth()
  const router = useRouter()
  const { notifyError } = useToastify()

  const validateSearch = (name: string) => {
    const isValid = name.length >= 1 && name.length <= 40 && /^[^,]+$/.test(name)
    setSearchError(isValid ? '' : 'Invalid search. Use 1–40 characters and avoid commas.')
    return isValid
  }

  const handleInputChange = (value: SetStateAction<string>) => {
    setSearch(value.toString())
    if (validateSearch(value.toString())) {
      debounceFetchResults(value.toString())
    }
  }

  const debounceFetchResults = (() => {
    let timer: NodeJS.Timeout
    return (query: string) => {
      clearTimeout(timer)
      timer = setTimeout(() => fetchResults(query), 300)
    }
  })()

  const fetchResults = async (query: string) => {
    try {
      if (!userInContext || !query) return
      setSearchLoading(true)
      const newResults: SearchResult[] = []

      if (companies) {
        const companiesSearch = await searchInTable(userInContext.id, 'companies', query)
        newResults.push(...companiesSearch.map((item) => ({ ...item, table: 'companies' })))
      }
      if (products) {
        const productsSearch = await searchInTable(userInContext.id, 'products', query)
        newResults.push(...productsSearch.map((item) => ({ ...item, table: 'products' })))
      }
      if (categories) {
        const categoriesSearch = await searchInTable(userInContext.id, 'categories', query)
        newResults.push(...categoriesSearch.map((item) => ({ ...item, table: 'categories' })))
      }
      setSearchLoading(false)

      setResults(newResults)
      setError('')
      if (newResults.length > 0) setIsModalOpen(true)
    } catch (e) {
      console.error('Error searching', e)
      setError('Error searching. Please try again.')
      notifyError('Error searching', { autoClose: 2500 })
    }
  }

  const handleOnClick = (id: number, table: string) => {
    router.push(`/${table === 'categories' ? 'category' : table === 'products' ? 'product' : 'company'}/${id}`)
    setIsModalOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSearch(search)) return
    await fetchResults(search)
  }

  return (
    <div className='flex flex-col w-full'>
      <form onSubmit={handleSubmit} className='w-full flex flex-row items-center'>
        <div className='flex flex-col w-full'>
          <InputForm placeholder='Search' className='w-full' value={search} onChange={handleInputChange} onBlur={() => validateSearch(search)} />
        </div>

        <DefaultButton type='button' onClick={() => setIsModalOpen(true)} color='btn-transparent'>
          <SearchIcon size='sm' />
        </DefaultButton>
      </form>

      <Dialog.Root modal={false} open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black-a10' />
          <Dialog.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className='-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 flex flex-col items-center justify-center border border-opacity-30 border-default-dark dark:border-default-light bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 backdrop-blur-sm rounded-md transition duration-500 mt-4 p-1'
          >
            <Dialog.Title className='px-6 pt-5 font-semibold text-foreground text-large'>Search</Dialog.Title>
            {searchError && <p className='text-red-500 mt-2'>{searchError}</p>}
            {error && <p className='text-red-500'>{error}</p>}
            {searchLoading ? (
              <Loading msg='Searching' />
            ) : results.length > 0 ? (
              <ul className='overflow-x-auto w-full m-2 rounded-xl'>
                {results.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleOnClick(item.id, item.table)}
                    className={`flex flex-row ${
                      index % 2 === 0 ? 'bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50' : 'bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25'
                    } hover:bg-opacity-75 dark:hover:bg-opacity-75 ${index !== results.length - 1 ? 'border-b border-default-light dark:border-default-dark' : ''}`}
                  >
                    <p className='px-2 py-2'>{item.name}</p>
                    <div className='flex-grow'></div>
                    <p className='ms-4 px-2 py-2'>{item.table}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='px-6 py-5'>No results found.</p>
            )}
            <DefaultButton color='btn-transparent' onClick={() => setIsModalOpen(false)}>
              <XIcon />{' '}
            </DefaultButton>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

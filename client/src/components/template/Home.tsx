'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { CompanyData, UserInfo } from '@/lib/types'
import { getAllCompaniesByUserIdAndPagination } from '@/api/companies'
import { getUser } from '@/api/users'
import { CompaniesTable } from '@/components/organism/index/Companies'
import { AddCompanyForm } from '@/components/organism/index/AddCompanyForm'
import { EditCompanyForm } from '../organism/index/EditCompanyForm'
import Loading from '@/app/Loading'

export const Home = () => {
  const { auth } = useAuth()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [companyData, setCompanyData] = useState<CompanyData[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(3)
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

  const [addCompanyForm, setAddCompanyForm] = useState(false)
  const [editCompanyForm, setEditCompanyForm] = useState<number>(0)

  const authStatus = useCallback(async () => {
    if (!auth) {
      return false
    }
    return true
  }, [auth])

  const getData = useCallback(async () => {
    try {
      const userInfo = await getUser()
      setUser(userInfo)
      const companyData = await getAllCompaniesByUserIdAndPagination(userInfo.id, rowsPerPage, currentPage - 1)
      if (companyData.length < 1 && currentPage > 1) setCurrentPage(currentPage - 1)
      setCompanyData(companyData)
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }, [currentPage, rowsPerPage])

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const isAuthenticated = await authStatus()
      if (isAuthenticated) {
        await getData()
      }
    }
    checkAuthAndFetchUser()
  }, [getData, authStatus])

  const toggleAddCompanyForm = () => (addCompanyForm ? setAddCompanyForm(false) : setAddCompanyForm(true))

  return (
    <>
      <div className='w-full flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-orange-500 dark:bg-gradient-to-b dark:from-sky-700 dark:to-violet-600 px-2'>
        <div
          className={`${
            !addCompanyForm && !editCompanyForm ? 'w-full' : 'max-w-md w-full'
          } flex flex-col items-center justify-center border border-opacity-30 border-defaul-dark dark:border-default-light py-4 px-8 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 shadow-2xl backdrop-blur-sm rounded transition duration-500`}
        >
          {auth ? (
            !addCompanyForm && !editCompanyForm ? (
              <div className='flex flex-col space-y-2 justify-center items-center w-full'>
                {!companyData ? (
                  <Loading msg='Loading' />
                ) : (
                  <CompaniesTable
                    companyData={companyData.length > 0 ? companyData : falseData}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={setRowsPerPage}
                    getData={getData}
                    setEditCompanyForm={setEditCompanyForm}
                    placeholder={companyData.length > 0 ? false : true}
                  />
                )}
                <div>
                  <DefaultButton onClick={toggleAddCompanyForm}>Add company</DefaultButton>
                </div>
              </div>
            ) : addCompanyForm ? (
              <>
                <div className='flex flex-col space-y-2 justify-center items-center w-full'>{user && <AddCompanyForm userId={user.id} toggleForm={toggleAddCompanyForm} getData={getData} />}</div>
              </>
            ) : (
              editCompanyForm !== 0 && (
                <>
                  <EditCompanyForm companyId={editCompanyForm} setEditCompanyForm={setEditCompanyForm} getData={getData} />
                </>
              )
            )
          ) : (
            <CompaniesTable
              companyData={falseData}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              setCurrentPage={setCurrentPage}
              setRowsPerPage={setRowsPerPage}
              getData={getData}
              setEditCompanyForm={setEditCompanyForm}
              placeholder={true}
            />
          )}
        </div>
      </div>
    </>
  )
}

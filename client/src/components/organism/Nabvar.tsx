'use client'

import { useAuth } from '@/context/AuthProvider'
import { useTheme } from '@/context/ThemeProvider'

import { HomeIcon, UserIcon, SunIcon, MoonIcon, CheckIcon, InfoIcon, MenuIcon, SearchIcon, StoreIcon, InboxStackIcon, TagIcon } from '@/components/atoms/icons/index'

import { Button } from '@nextui-org/button'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { useCallback, useEffect, useState } from 'react'
import { getUser } from '@/api/users'
import { UserInfo } from '@/lib/types'
import { LogoutForm } from '@/components/organism/account/LogoutForm'

import { LinkButton } from '@/components/atoms/buttons/LinkButton'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'

import { useRouter } from 'next/navigation'

export const Navbar = () => {
  const { auth, authFalse } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [user, setUser] = useState<UserInfo | null>(null)

  const router = useRouter()

  const authStatus = useCallback(async () => {
    if (!auth) {
      return false
    }
    return true
  }, [auth])

  const getUserInfo = useCallback(async () => {
    try {
      const userInfo = await getUser()
      setUser(userInfo)
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }, [])

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const isAuthenticated = await authStatus()
      if (isAuthenticated) {
        await getUserInfo()
      }
    }
    checkAuthAndFetchUser()
  }, [getUserInfo, authStatus])

  return (
    <nav className='z-10 sticky top-0 flex flex-col sm:flex-row space-x-2 px-3 py-2 w-full bg-transparent backdrop-blur-sm'>
      <Dropdown>
        <DropdownTrigger className='flex justify-center outline-none'>
          <Button type='button'>
            {user && auth ? (
              <div className='bg-default-light dark:bg-default-dark text-primary-light p-2 rounded-full text-sm font-semibold items-center justify-center'>
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </div>
            ) : (
              <div className='flex text-default-dark dark:text-default-light p-2 rounded-full text-xl font-semibold items-center justify-center'>
                <MenuIcon size='sm' />
              </div>
            )}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className='max-w-md w-full flex flex-col items-center justify-center border border-opacity-30 border-default-dark dark:border-default-light bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 backdrop-blur-sm rounded-md transition duration-500 mt-4 p-1'
          variant='solid'
          aria-label='Static Actions'
        >
          {user && auth ? (
            <>
              <DropdownItem
                className='flex flex-row p-1 hover:bg-default-light hover:dark:bg-default-dark hover:bg-opacity-50 hover:dark:bg-opacity-50 transition duration-500 rounded-md'
                key='user'
                onClick={() => router.push('/account')}
              >
                <>
                  <div className='w-full flex flex-col items-center'>
                    <div className='w-full flex flex-col items-center'>
                      {user.status ? (
                        <>
                          <p className='my-1 mx-0 font-light border-2 border-primary-light text-default-dark dark:text-default-light rounded-xl text-sm text-center px-2'>{user.status}</p>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='flex flex-col ms-1'>
                      <div className='flex flex-row'>
                        <p className='mx-0 font-bold text-2xl'>
                          {user.first_name}
                          <span> </span>
                          {user.last_name}
                        </p>
                      </div>
                      <p className='mx-0'>@{user.username}</p>
                      <p className='mx-0 font-extralight'>{user.email}</p>
                    </div>
                    <div className='flex flex-row justify-start items-start w-full'>
                      {user.verified === 1 ? (
                        <span className='flex flex-row justify-start items-center text-green-500 ps-1'>
                          <CheckIcon size='sm' />
                          <p className='text-nowrap text-sm ps-1'>Verified</p>
                        </span>
                      ) : (
                        <span className='flex flex-row justify-start items-center text-red-500 ps-1'>
                          <InfoIcon size='sm' />
                          <p className='text-nowrap text-sm ps-1'>No verified</p>
                        </span>
                      )}
                    </div>
                  </div>
                </>
              </DropdownItem>
              <DropdownItem className='flex flex-row p-0 w-full' key='Logout'>
                <LogoutForm color='btn-transparent' authFalse={authFalse} className='w-full' />
              </DropdownItem>
              <DropdownItem className='flex flex-row p-0' key='Companies'>
                <LinkButton type='btn-transparent' size='md' href='/company'>
                  {<StoreIcon />}Companies
                </LinkButton>
              </DropdownItem>
              <DropdownItem className='flex flex-row p-0' key='Products'>
                <LinkButton type='btn-transparent' size='md' href='/product'>
                  {<InboxStackIcon />}Products
                </LinkButton>
              </DropdownItem>
              <DropdownItem className='flex flex-row p-0' key='Category'>
                <LinkButton type='btn-transparent' size='md' href='/category'>
                  {<TagIcon />}Category
                </LinkButton>
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem className='flex flex-row p-0' key='Logout'>
                <LinkButton type='btn-transparent' size='md' href='/account'>
                  {<UserIcon />}Login
                </LinkButton>
              </DropdownItem>
            </>
          )}
          <DropdownItem className='flex flex-row p-0' key='Home'>
            <LinkButton type='btn-transparent' size='md' href='/'>
              {<HomeIcon size='md' />}Home
            </LinkButton>
          </DropdownItem>
          <DropdownItem className='flex flex-row p-0' key='Theme'>
            <DefaultButton onClick={toggleTheme} color='btn-transparent' className='w-full justify-center items-center'>
              {theme === 'light' ? <SunIcon size='sm' /> : <MoonIcon size='sm' />}Theme
            </DefaultButton>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className='flex w-full justify-center items-center'>
        <div className='flex flex-row max-w-2xl w-full justify-center items-center'>
          <InputForm placeholder='Search' className='focus:bg-default-light focus:bg-opacity-50 focus:dark:bg-default-dark focus:dark:bg-opacity-50 rounded-t' />
          <SearchIcon size='sm' />
        </div>
      </div>
    </nav>
  )
}

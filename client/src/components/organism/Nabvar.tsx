'use client'

import { useAuth } from '@/context/AuthProvider'
import { useTheme } from '@/context/ThemeProvider'

import { HomeIcon } from '@/components/atoms/icons/Home'
import { UserIcon } from '@/components/atoms/icons/User'
import { SunIcon } from '@/components/atoms/icons/Sun'
import { MoonIcon } from '@/components/atoms/icons/Moon'

import { Button } from '@nextui-org/button'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { useCallback, useEffect, useState } from 'react'
import { getUser } from '@/api/users'
import { UserInfo } from '@/lib/types'
import { LogoutForm } from '@/components/organism/account/LogoutForm'
import { CheckIcon } from '@/components/atoms/icons/Check'
import { InfoIcon } from '@/components/atoms/icons/Info'
import { LinkButton } from '@/components/atoms/buttons/LinkButton'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { MenuIcon } from '@/components/atoms/icons/Menu'
import { SearchIcon } from '@/components/atoms/icons/Search'

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
    <nav className='z-10 sticky top-0 flex flex-col sm:flex-row space-x-2 px-3 py-2 w-full'>
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
          className='max-w-md w-full flex flex-col items-center justify-center border border-opacity-30 border-default-dark dark:border-default-light bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm rounded transition duration-500 mt-4'
          variant='solid'
          aria-label='Static Actions'
        >
          <DropdownItem className='flex flex-row p-1 hover:bg-neutral-500 hover:bg-opacity-50' key='user' onClick={() => router.push('/account')}>
            {user && auth ? (
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
            ) : (
              ''
            )}
          </DropdownItem>
          <DropdownItem className='flex flex-row p-0' key='Logout'>
            {user && auth ? (
              <LogoutForm color='btn-third' authFalse={authFalse} />
            ) : (
              <LinkButton size='md' href='/account'>
                {<UserIcon />}Login
              </LinkButton>
            )}
          </DropdownItem>
          <DropdownItem className='flex flex-row p-0' key='Home'>
            <LinkButton size='md' href='/'>
              {<HomeIcon />}Home
            </LinkButton>
          </DropdownItem>
          <DropdownItem className='flex flex-row p-0' key='Theme'>
            <DefaultButton onClick={toggleTheme} color='btn-third' className='w-full justify-center items-center'>
              {theme === 'light' ? <SunIcon size='sm' /> : <MoonIcon size='sm' />}Theme
            </DefaultButton>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className='flex w-full justify-center items-center'>
        <div className='flex flex-row max-w-2xl w-full justify-center items-center'>
          <InputForm placeholder='Search' />
          <SearchIcon size='sm' />
        </div>
      </div>
    </nav>
  )
}

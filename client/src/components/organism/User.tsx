'use client'

import { getUser } from '@/api/users'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserInfo } from '@/lib/types'
import { useAuth } from '@/context/AuthContext'
import { LinkButton } from '@/components/atoms/buttons/LinkButton'

import { OtpsSend } from '@/components/organism/OtpsSend'
import { OtpsVerify } from '@/components/organism/OtpsVerify'
import { LogoutForm } from './LogoutForm'

export const User = () => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const { auth, authFalse } = useAuth()
  const router = useRouter()
  const [statusVerifyForm, setStatusVerifyForm] = useState(false)

  const toggleVerifyForm = () => (statusVerifyForm ? setStatusVerifyForm(false) : setStatusVerifyForm(true))

  const authStatus = useCallback(async () => {
    if (!auth) {
      setTimeout(() => router.push('/'), 3000)
      return false
    }
    return true
  }, [router, auth])

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
    <>
      <div className='w-full flex flex-col space-y-4'>
        <div className='flex flex-col space-y-2'>
          {!user ? (
            'Loading...'
          ) : !statusVerifyForm ? (
            <>
              <div className='flex flex-col items-center'>
                <div>
                  <p className='font-bold inline'>Name: </p>
                  <p className='mx-0 inline'>{user.username}</p>
                </div>
                <div>
                  <p className='font-bold inline'>Email: </p>
                  <p className='mx-0 inline'>{user.email}</p>
                </div>
                <div>
                  <p className='font-bold inline'>Verified: </p>
                  <p className='mx-0 inline'>{user.verified === 1 ? 'yes' : 'no please verify'}</p>
                </div>
              </div>
              <div className='flex flex-row space-x-2'>
                <LogoutForm authFalse={authFalse} />
                {user.verified === 1 ? '' : <OtpsSend email={user.email} purpose='email_verification' toggleVerifyForm={toggleVerifyForm} />}
                <LinkButton href='/'>Home</LinkButton>
              </div>
            </>
          ) : (
            <>
              <OtpsVerify email={user.email} purpose='email_verification' getUserInfo={getUserInfo} toggleVerifyForm={toggleVerifyForm} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

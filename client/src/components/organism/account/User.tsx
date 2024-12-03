'use client'

import { getUser } from '@/api/users'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserInfo } from '@/lib/types'
import { useAuth } from '@/context/AuthProvider'
import { LinkButton } from '@/components/atoms/buttons/LinkButton'

import { OtpsSend } from '@/components/organism/account/OtpsSend'
import { OtpsVerify } from '@/components/organism/account/OtpsVerify'
import { LogoutForm } from '@/components/organism/account/LogoutForm'
import { ChangePasswordForm } from '@/components/organism/account/ChangePasswordForm'

import { CheckIcon } from '@/components/atoms/icons/Check'
import { InfoIcon } from '@/components/atoms/icons/Info'
import { EditIcon } from '@/components/atoms/icons/Edit'

import Loading from '@/app/Loading'
import { EditUser } from '@/components/organism/account/EditUserForm'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { PlusIcon } from '@/components/atoms/icons/Plus'
import { KeyIcon } from '@/components/atoms/icons/Key'

export const User = () => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const { auth, authFalse } = useAuth()
  const router = useRouter()
  const [statusVerifyForm, setStatusVerifyForm] = useState(false)
  const [statusEditForm, setStatusEditForm] = useState(false)
  const [statusChangePasswordForm, setStatusChangePasswordForm] = useState(false)

  const toggleVerifyForm = () => (statusVerifyForm ? setStatusVerifyForm(false) : setStatusVerifyForm(true))
  const toggleEditForm = () => (statusEditForm ? setStatusEditForm(false) : setStatusEditForm(true))
  const toggleChangePasswordForm = () => (statusChangePasswordForm ? setStatusChangePasswordForm(false) : setStatusChangePasswordForm(true))

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
      <div className='w-full flex flex-col space-y-4 py-4'>
        {!user ? (
          <Loading msg='Loading user info' />
        ) : !statusVerifyForm && !statusEditForm && !statusChangePasswordForm ? (
          <>
            <div className='w-full flex flex-col items-center'>
              <div className='w-full flex flex-col sm:flex-row items-center'>
                <div className='flex relative bg-default-light dark:bg-default-dark text-primary-light p-4 rounded-full text-4xl font-semibold items-center justify-center mb-4'>
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                  <div className='absolute -bottom-7 group text-nowrap'>
                    {user.status ? (
                      <>
                        <p className='mx-0 font-light border-2 border-primary-light text-default-dark dark:text-default-light rounded-xl text-sm text-center px-2'>{user.status}</p>
                        <DefaultButton className='hidden group-hover:block absolute -top-1 -right-5' size='sm' color='btn-third' onClick={toggleEditForm}>
                          <EditIcon size='sm' />
                        </DefaultButton>
                      </>
                    ) : (
                      <DefaultButton className='' color='btn-third' size='sm' onClick={toggleEditForm}>
                        <PlusIcon size='sm' />
                      </DefaultButton>
                    )}
                  </div>
                </div>
                <div className='flex flex-col ms-4'>
                  <div className='flex flex-row'>
                    <p className='mx-0 font-bold text-2xl'>
                      {user.first_name}
                      <span> </span>
                      {user.last_name}
                      {user.verified === 1 ? (
                        <span className='relative inline-block justify-center items-end text-green-500 ps-1 group'>
                          <CheckIcon size='sm' />
                          <span className='hidden group-hover:block absolute top-1 -right-14 text-nowrap text-sm'>Verified</span>
                        </span>
                      ) : (
                        <span className='relative inline-block justify-center items-end text-red-500 ps-1 group'>
                          <InfoIcon size='sm' />
                          <span className='hidden group-hover:block absolute top-1 -right-20 text-nowrap text-sm'>No verified</span>
                        </span>
                      )}
                    </p>
                  </div>
                  <p className='mx-0'>@{user.username}</p>
                  <p className='mx-0 font-extralight'>{user.email}</p>
                </div>
              </div>
              <div className='relative flex flex-row group ps-1 pe-4 w-full mt-7 mb-2'>
                {user.bio ? (
                  <>
                    <p className='break-words w-full font-semibold'>{user.bio}</p>
                    <DefaultButton className='hidden group-hover:block absolute top-0 -right-3' size='sm' color='btn-third' onClick={toggleEditForm}>
                      <EditIcon size='sm' />
                    </DefaultButton>
                  </>
                ) : (
                  <DefaultButton className='' color='btn-secondary' size='sm' onClick={toggleEditForm}>
                    Add bio
                  </DefaultButton>
                )}
              </div>
              <div className='flex flex-row flex-wrap w-full'>
                {user.create_at && <p className='border-2 border-primary-light rounded-2xl px-1.5 font-semibold text-nowrap text-sm m-1'>Joined: {user.create_at}</p>}
                {user.update_at && <p className='border-2 border-primary-light rounded-2xl px-1.5 font-semibold text-nowrap text-sm m-1'>Updated: {user.update_at}</p>}
                {user.update_at && <p className='border-2 border-primary-light rounded-2xl px-1.5 font-semibold text-nowrap text-sm m-1'>Companies: 12</p>}
                {user.update_at && <p className='border-2 border-primary-light rounded-2xl px-1.5 font-semibold text-nowrap text-sm m-1'>Products: 54</p>}
              </div>
            </div>
            <div className='flex flex-col space-y-2'>
              {user.verified === 1 ? '' : <OtpsSend email={user.email} purpose='email_verification' toggleVerifyForm={toggleVerifyForm} />}
              <div>
                <DefaultButton onClick={toggleChangePasswordForm} color='btn-primary' size='sm' className='flex flex-row items-center'>
                  <KeyIcon size='sm' className='pe-1' />
                  Change password
                </DefaultButton>
              </div>
            </div>
            <div className='flex flex-row space-x-2'>
              <LogoutForm authFalse={authFalse} />
              <DefaultButton onClick={toggleEditForm} color='btn-secondary'>
                Edit
              </DefaultButton>
              <LinkButton href='/'>Home</LinkButton>
            </div>
          </>
        ) : statusVerifyForm ? (
          <>
            <OtpsVerify email={user.email} purpose='email_verification' getUserInfo={getUserInfo} toggleVerifyForm={toggleVerifyForm} />
          </>
        ) : statusEditForm ? (
          <>
            <EditUser getUserInfo={getUserInfo} toggleEditForm={toggleEditForm} />
          </>
        ) : statusChangePasswordForm ? (
          <>
            <ChangePasswordForm userId={user.id} toggleChangePasswordForm={toggleChangePasswordForm} />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

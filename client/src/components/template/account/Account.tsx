'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthProvider'

import { LoginForm } from '@/components/organism/account/LoginForm'
import { RegisterForm } from '@/components/organism/account/RegisterForm'
import { User } from '@/components/organism/account/User'

export const Account = () => {
  const { auth } = useAuth()
  const [statusForm, setStatusForm] = useState(false)

  const toggleForm = () => (statusForm ? setStatusForm(false) : setStatusForm(true))

  return (
    <>
      <div className='flex-1 flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark bg-cover bg-no-repeat bg-center px-2'>
        <div className='max-w-md w-full flex flex-col items-center justify-center border border-opacity-30 border-defaul-dark dark:border-default-light py-4 px-8 bg-default-light dark:bg-default-dark bg-opacity-25 dark:bg-opacity-25 shadow-2xl  backdrop-blur-sm rounded transition duration-500'>
          {!auth ? (
            !statusForm ? (
              <>
                <h1 className='text-3xl font-bold text-defaul-dark dark:text-default-light'>Login</h1>
                <LoginForm toggleForm={toggleForm} />
              </>
            ) : (
              <>
                <h1 className='text-3xl font-bold text-defaul-dark dark:text-default-light'>Register</h1>
                <RegisterForm toggleForm={toggleForm} />
              </>
            )
          ) : (
            <>
              <h1 className='text-3xl font-bold text-defaul-dark dark:text-default-light'>User</h1>
              <User />
            </>
          )}
        </div>
      </div>
    </>
  )
}

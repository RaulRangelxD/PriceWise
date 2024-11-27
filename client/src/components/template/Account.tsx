'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

import { LoginForm } from '@/components/organism/LoginForm'
import { RegisterForm } from '@/components/organism/RegisterForm'
import { User } from '@/components/organism/User'

export const Account = () => {
  const { auth } = useAuth()
  const [statusForm, setStatusForm] = useState(false)

  const toggleForm = () => (statusForm ? setStatusForm(false) : setStatusForm(true))

  return (
    <>
      <>
        <div className='flex-1 flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark bg-cover bg-no-repeat bg-center px-2'>
          <div className='max-w-sm w-full flex flex-col items-center justify-center border border-opacity-30 border-neutral-950 dark:border-neutral-100 p-2 bg-neutral-500 bg-opacity-15 backdrop-blur-sm rounded transition duration-500'>
            {!auth ? (
              !statusForm ? (
                <>
                  <h1 className='text-3xl font-bold text-neutral-950 dark:text-neutral-100'>Login</h1>
                  <LoginForm toggleForm={toggleForm} />
                </>
              ) : (
                <>
                  <h1 className='text-3xl font-bold text-neutral-950 dark:text-neutral-100'>Register</h1>
                  <RegisterForm toggleForm={toggleForm} />
                </>
              )
            ) : (
              <>
                <h1>User</h1>
                <User />
              </>
            )}
          </div>
        </div>
      </>
    </>
  )
}

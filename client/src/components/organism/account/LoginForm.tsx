'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { LinkButton } from '@/components/atoms/buttons/LinkButton'
import { authCheck, login } from '@/api/auth'
import { useAuth } from '@/context/AuthProvider'
import { useState } from 'react'
import { getUser } from '@/api/users'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  toggleForm: () => void
}

export const LoginForm = ({ toggleForm }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [error, setError] = useState('')

  const { authTrue } = useAuth()
  const router = useRouter()

  const validateEmail = (email: string) => {
    const isValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    setErrorEmail(isValid ? '' : 'Invalid email format')
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) return

    try {
      await login(email, password)

      await authCheck()
      const userData = await getUser()
      authTrue(userData)
      setError('')
      setEmail('')
      setPassword('')
      router.push(`/`)
    } catch (e) {
      console.log('Error authenticating user', e)
      setError('Error authenticating user')
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8'>
        <InputForm placeholder='Email' value={email} onChange={setEmail} onBlur={validateEmail} />
        {errorEmail && <p className='text-red-500 mt-2'>{errorEmail}</p>}

        <InputForm placeholder='Password' type='password' value={password} onChange={setPassword} />
        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-row space-x-2'>
          <DefaultButton color='btn-primary' type='submit' className='grow'>
            Login
          </DefaultButton>
          <DefaultButton color='btn-secondary' onClick={toggleForm}>
            To register
          </DefaultButton>
          <LinkButton href='/'>Home</LinkButton>
        </div>
      </form>
    </>
  )
}

'use client'

import { Button } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { LinkButton } from '../atoms/buttons/LinkButton'
import { authCheck, login } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'

interface LoginFormProps {
  toggleForm: () => void
}

export const LoginForm = ({ toggleForm }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [error, setError] = useState('')
  const { authTrue } = useAuth()

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
      authCheck()
      authTrue()
      setError('')
      setEmail('')
      setPassword('')
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
          <Button color='btn-primary' type='submit' className='grow'>
            Login
          </Button>
          <Button color='btn-secondary' onClick={toggleForm}>
            To register
          </Button>
          <LinkButton href='/'>Home</LinkButton>
        </div>
      </form>
    </>
  )
}

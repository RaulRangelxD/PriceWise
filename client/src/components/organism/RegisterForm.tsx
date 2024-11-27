'use client'

import { Button } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { LinkButton } from '../atoms/buttons/LinkButton'
import { registerUser } from '@/api/users'
import { useState } from 'react'

interface RegisterFormProps {
  toggleForm: () => void
}

export const RegisterForm = ({ toggleForm }: RegisterFormProps) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [errorUsername, setErrorUsername] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorpassword] = useState('')
  const [errorPassword2, setErrorpassword2] = useState('')
  const [error, setError] = useState('')

  const validateUsername = (username: string) => {
    const isValid = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)
    setErrorUsername(isValid ? '' : 'Invalid username format')
    return isValid
  }

  const validateEmail = (email: string) => {
    const isValid = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)
    setErrorEmail(isValid ? '' : 'Invalid email format')
    if (!isValid) {
      console.log('ERROOOOOR')
    }
    return isValid
  }

  const validatePassword = (password: string) => {
    const isValid = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/gm.test(password)
    setErrorpassword(isValid ? '' : 'Invalid password format')
    return isValid
  }

  const validatePassword2 = (password2: string) => {
    const isValid = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/gm.test(password)
    setErrorpassword2(isValid ? '' : 'Invalid password format')
    if (password !== password2) {
      setErrorpassword2('Password dont equal')
    }
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateUsername(username)) return
    if (!validateEmail(email)) return
    if (!validatePassword(password)) return
    if (!validatePassword2(password2)) return

    try {
      await registerUser(username, email, password)
      setError('')

      setUsername('')
      setEmail('')
      setPassword('')
      setPassword2('')
      toggleForm()
    } catch (e) {
      console.log('Error authenticating user', e)
      setError('Error authenticating user')
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8'>
        <InputForm placeholder='Username' value={username} onChange={setUsername} onBlur={validateUsername} />
        {errorUsername && <p className='text-red-500 mt-2'>{errorUsername}</p>}

        <InputForm placeholder='Email' value={email} onChange={setEmail} onBlur={validateEmail} />
        {errorEmail && <p className='text-red-500 mt-2'>{errorEmail}</p>}

        <InputForm placeholder='Password' value={password} onChange={setPassword} onBlur={validatePassword} type='password' />
        {errorPassword && <p className='text-red-500'>{errorPassword}</p>}

        <InputForm placeholder='Repeat password' value={password2} onChange={setPassword2} onBlur={validatePassword2} type='password' />
        {errorPassword2 && <p className='text-red-500'>{errorPassword2}</p>}

        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-row space-x-2'>
          <Button color='btn-primary' type='submit' className='grow'>
            Register
          </Button>
          <Button color='btn-secondary' onClick={toggleForm}>
            To Login
          </Button>
          <LinkButton href='/'>Home</LinkButton>
        </div>
      </form>
    </>
  )
}

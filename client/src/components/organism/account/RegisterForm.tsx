'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { LinkButton } from '@/components/atoms/buttons/LinkButton'
import { postUser } from '@/api/users'
import { useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'

interface RegisterFormProps {
  toggleForm: () => void
}

export const RegisterForm = ({ toggleForm }: RegisterFormProps) => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [errorUsername, setErrorUsername] = useState('')
  const [errorFirstName, setErrorFirstName] = useState('')
  const [errorLastName, setErrorLastName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorpassword] = useState('')
  const [errorPassword2, setErrorpassword2] = useState('')
  const [error, setError] = useState('')

  const { notifySuccess, notifyError } = useToastify()

  const validateUsername = (username: string) => {
    const isValid = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)
    setErrorUsername(isValid ? '' : 'Invalid username format')
    return isValid
  }

  const validateFirstName = (firstName: string) => {
    const isValid = /^[a-z ,.'-]+$/i.test(firstName)
    setErrorFirstName(isValid ? '' : 'Invalid first name format')
    return isValid
  }

  const validateLastName = (lastName: string) => {
    const isValid = /^[a-z ,.'-]+$/i.test(lastName)
    setErrorLastName(isValid ? '' : 'Invalid last name format')
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
    let isValid = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/gm.test(password)
    setErrorpassword2(isValid ? '' : 'Invalid password format')
    if (password !== password2) {
      setErrorpassword2('Password dont equal')
      isValid = false
    }
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateUsername(username)) return
    if (!validateFirstName(firstName)) return
    if (!validateLastName(lastName)) return
    if (!validateEmail(email)) return
    if (!validatePassword(password)) return
    if (!validatePassword2(password2)) return

    try {
      await postUser(username, email, firstName, lastName, password)
      notifySuccess('User registered succesfull', { autoClose: 2500 })

      setError('')

      setUsername('')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setPassword2('')
      toggleForm()
    } catch (e) {
      console.log('Error register user', e)
      setError('Error register user')
      notifyError('Error register user', { autoClose: 2500 })
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8'>
        <InputForm placeholder='Username' value={username} onChange={setUsername} onBlur={validateUsername} />
        {errorUsername && <p className='text-red-500 mt-2'>{errorUsername}</p>}

        <InputForm placeholder='First Name' value={firstName} onChange={setFirstName} onBlur={validateFirstName} />
        {errorFirstName && <p className='text-red-500 mt-2'>{errorFirstName}</p>}

        <InputForm placeholder='Last Name' value={lastName} onChange={setLastName} onBlur={validateLastName} />
        {errorLastName && <p className='text-red-500 mt-2'>{errorLastName}</p>}

        <InputForm placeholder='Email' value={email} onChange={setEmail} onBlur={validateEmail} />
        {errorEmail && <p className='text-red-500 mt-2'>{errorEmail}</p>}

        <InputForm placeholder='Password' value={password} onChange={setPassword} onBlur={validatePassword} type='password' />
        {errorPassword && <p className='text-red-500'>{errorPassword}</p>}

        <InputForm placeholder='Repeat password' value={password2} onChange={setPassword2} onBlur={validatePassword2} type='password' />
        {errorPassword2 && <p className='text-red-500'>{errorPassword2}</p>}

        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-row space-x-2'>
          <DefaultButton color='btn-primary' type='submit' className='grow'>
            Register
          </DefaultButton>
          <DefaultButton color='btn-secondary' onClick={toggleForm}>
            To Login
          </DefaultButton>
          <LinkButton href='/'>Home</LinkButton>
        </div>
      </form>
    </>
  )
}

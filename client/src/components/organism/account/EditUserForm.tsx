'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { getUser, patchUser } from '@/api/users'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { UserInfo } from '@/lib/types'
import Loading from '@/app/Loading'
import { useToastify } from '@/context/ToastifyProvider'

interface EditUserProps {
  getUserInfo: () => void
  toggleEditForm: () => void
}

export const EditUser = ({ getUserInfo, toggleEditForm }: EditUserProps) => {
  const [id, setId] = useState<string>('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [status, setStatus] = useState('')

  const [errorUsername, setErrorUsername] = useState('')
  const [errorFirstName, setErrorFirstName] = useState('')
  const [errorLastName, setErrorLastName] = useState('')
  const [errorBio, setErrorBio] = useState('')
  const [errorStatus, setErrorStatus] = useState('')
  const [error, setError] = useState('')

  const [user, setUser] = useState<UserInfo | null>(null)
  const { auth } = useAuth()
  const router = useRouter()

  const { notifySuccess, notifyError } = useToastify()

  const authStatus = useCallback(async () => {
    if (!auth) {
      setTimeout(() => router.push('/'), 3000)
      return false
    }
    return true
  }, [router, auth])

  const getUserInfox = useCallback(async () => {
    try {
      const userInfo = await getUser()
      setUser(userInfo)
      setId(userInfo.id)
      setUsername(userInfo.username)
      setFirstName(userInfo.first_name)
      setLastName(userInfo.last_name)

      if (userInfo.bio) {
        setBio(userInfo.bio)
      }
      if (userInfo.status) {
        setStatus(userInfo.status)
      }
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }, [])

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const isAuthenticated = await authStatus()
      if (isAuthenticated) {
        await getUserInfox()
      }
    }
    checkAuthAndFetchUser()
  }, [getUserInfox, authStatus])

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

  const validateBio = (bio: string) => {
    const isValid = /^.{1,280}$/.test(bio)
    setErrorBio(isValid ? '' : 'Invalid bio format only 280 caracters')
    return isValid
  }

  const validateStatus = (status: string) => {
    const isValid = /^.{1,20}$/.test(status)
    setErrorStatus(isValid ? '' : 'Invalid status format only 20 caracters')
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateUsername(username)) return
    if (!validateFirstName(firstName)) return
    if (!validateLastName(lastName)) return

    try {
      await patchUser(username, firstName, lastName, bio, status, id)
      notifySuccess('User edited sucessfull', { autoClose: 2500 })

      setError('')

      setUsername('')
      setFirstName('')
      setLastName('')
      getUserInfo()
      toggleEditForm()
    } catch (e) {
      console.log('Error editing user', e)
      setError('Error editing user')
      notifyError('Error editing user', { autoClose: 2500 })
    }
  }

  return (
    <>
      {!user ? (
        <Loading msg='Loading user info' />
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
            <h2 className='font-bold text-2xl'>Edit</h2>

            <InputForm placeholder='Username' value={username} onChange={setUsername} onBlur={validateUsername} />
            {errorUsername && <p className='text-red-500 mt-2'>{errorUsername}</p>}

            <InputForm placeholder='First Name' value={firstName} onChange={setFirstName} onBlur={validateFirstName} />
            {errorFirstName && <p className='text-red-500 mt-2'>{errorFirstName}</p>}

            <InputForm placeholder='Last Name' value={lastName} onChange={setLastName} onBlur={validateLastName} />
            {errorLastName && <p className='text-red-500 mt-2'>{errorLastName} </p>}

            <InputForm placeholder='Bio' value={bio} onChange={setBio} onBlur={validateBio} />
            {errorBio && <p className='text-red-500 mt-2'>{errorBio} </p>}

            <InputForm placeholder='Status' value={status} onChange={setStatus} onBlur={validateStatus} />
            {errorStatus && <p className='text-red-500 mt-2'>{errorStatus}</p>}

            {error && <p className='text-red-500'>{error}</p>}

            <div className='flex flex-row space-x-2'>
              <DefaultButton color='btn-primary' type='submit' className='grow'>
                Edit
              </DefaultButton>
              <DefaultButton color='btn-secondary' onClick={toggleEditForm}>
                Back
              </DefaultButton>
            </div>
          </form>
        </>
      )}
    </>
  )
}

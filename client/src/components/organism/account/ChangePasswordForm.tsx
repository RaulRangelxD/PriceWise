'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { verifyPassword } from '@/api/auth'
import { patchPassword } from '@/api/users'

interface ChangePasswordFormProps {
  userId: number
  toggleChangePasswordForm: () => void
}

export const ChangePasswordForm = ({ userId, toggleChangePasswordForm }: ChangePasswordFormProps) => {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [errorOldPassword, setErrorOldpassword] = useState('')
  const [errorPassword, setErrorpassword] = useState('')
  const [errorPassword2, setErrorpassword2] = useState('')

  const { notifySuccess, notifyError } = useToastify()

  const validateOldPassword = (oldPassword: string) => {
    let isValid = true
    if (oldPassword === password) {
      setErrorOldpassword('New password equal to old password')
      isValid = false
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

    if (!validateOldPassword(oldPassword)) return

    try {
      await verifyPassword(oldPassword)
      setErrorOldpassword('')
    } catch (e) {
      console.log('Old password not valid', e)
      notifyError('Old password not valid', { autoClose: 2500 })
      setErrorOldpassword('Old password not valid')
      return
    }

    if (!validatePassword(password)) return
    if (!validatePassword2(password2)) return

    try {
      await patchPassword(password, userId)

      setOldPassword('')
      setErrorOldpassword('')
      setPassword('')
      setPassword2('')
      notifySuccess('Password changed successfull', { autoClose: 2500, delay: 500 })
      toggleChangePasswordForm()
    } catch (e) {
      console.log('Error changing password user', e)
      notifyError('Error changing password user', { autoClose: 2500 })
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
        <h2 className='font-bold text-2xl'>Change password</h2>
        <InputForm placeholder='Old password' value={oldPassword} onChange={setOldPassword} type='password' />
        {errorOldPassword && <p className='text-red-500'>{errorOldPassword}</p>}

        <InputForm placeholder='New password' value={password} onChange={setPassword} onBlur={validatePassword} type='password' />
        {errorPassword && <p className='text-red-500'>{errorPassword}</p>}

        <InputForm placeholder='Repeat new password' value={password2} onChange={setPassword2} onBlur={validatePassword2} type='password' />
        {errorPassword2 && <p className='text-red-500'>{errorPassword2}</p>}

        <div className='flex flex-row space-x-2'>
          <DefaultButton color='btn-primary' type='submit' className='grow'>
            Change
          </DefaultButton>
          <DefaultButton color='btn-secondary' onClick={toggleChangePasswordForm}>
            Back
          </DefaultButton>
        </div>
      </form>
    </>
  )
}

'user client'

import { postCompany } from '@/api/companies'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { BackIcon, PlusIcon } from '@/components/atoms/icons'

export const AddCompanyForm = () => {
  const [name, setName] = useState<string>('')
  const [rif, setRif] = useState<string>('')
  const [rifType, setRifType] = useState<string>('J-')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')
  const [rifError, setRifError] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')
  const [addressError, setAddressError] = useState<string>('')

  const [error, setError] = useState('')

  const { userInContext } = useAuth()
  const router = useRouter()
  const { notifySuccess, notifyError } = useToastify()

  const validateName = (name: string) => {
    const isValid = /^.{1,40}$/.test(name)
    setNameError(isValid ? '' : 'Invalid name format only 40 caracters')
    return isValid
  }

  const validateRif = (rif: string) => {
    const isValid = /([0-9]{1,10})$/.test(rif)
    setRifError(isValid ? '' : 'Invalid rif format (J-123456789)')
    return isValid
  }

  const validatePhone = (phone: string) => {
    const isValid = /^[0-9\+\-]+$/.test(phone)
    setPhoneError(isValid ? '' : 'Invalid phone format (0123-1234567)')
    return isValid
  }

  const validateAddress = (address: string) => {
    const isValid = /^.{1,300}$/.test(address)
    setAddressError(isValid ? '' : 'Invalid address format only 300 caracters')
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateName(name)) return
    if (!validateRif(rif)) return
    if (!validatePhone(phone)) return
    if (!validateAddress(address)) return

    const completeRif = rifType + rif

    try {
      if (!userInContext) return
      await postCompany(userInContext.id, name, completeRif, phone, address)
      notifySuccess('Company registered succesfull', { autoClose: 2500 })
      setError('')
      router.push(`/`)
    } catch (e) {
      console.log('Error register Company', e)
      setError('Error register Company')
      notifyError('Error register Company', { autoClose: 2500 })
    }
  }
  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center px-2'>
      <div className='box-border-shadow'>
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
          <InputForm placeholder='Company Name' value={name} onChange={setName} onBlur={validateName} />
          {nameError && <p className='text-red-500 mt-2'>{nameError}</p>}

          <div className='flex flex-row w-full space-x-1'>
            <select
              className='text-sm px-2 rounded-xl bg-default-light dark:bg-default-dark bg-opacity-50 dark:bg-opacity-50'
              value={rifType}
              onChange={(e) => {
                setRifType(e.target.value)
              }}
            >
              <option value={'J-'}>J</option>
              <option value={'V-'}>V</option>
              <option value={'E-'}>E</option>
            </select>
            <InputForm placeholder='RIF' value={rif} onChange={setRif} onBlur={validateRif} />
          </div>
          {rifError && <p className='text-red-500 mt-2'>{rifError}</p>}

          <InputForm placeholder='Phone Number' value={phone} onChange={setPhone} onBlur={validatePhone} />
          {phoneError && <p className='text-red-500 mt-2'>{phoneError}</p>}

          <InputForm placeholder='Address' value={address} onChange={setAddress} onBlur={validateAddress} />
          {addressError && <p className='text-red-500 mt-2'>{addressError}</p>}

          {error && <p className='text-red-500'>{error}</p>}

          <div className='flex flex-row space-x-2 justify-center'>
            <DefaultButton type='submit'>
              <PlusIcon /> Add Company
            </DefaultButton>
            <DefaultButton
              color='btn-secondary'
              type='button'
              onClick={() => {
                router.back()
              }}
            >
              <BackIcon className='me-1' />
              Back
            </DefaultButton>
          </div>
        </form>{' '}
      </div>
    </div>
  )
}

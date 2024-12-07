'user client'

import { getCompanyById, patchCompany } from '@/api/companies'
import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useCallback, useEffect, useState } from 'react'
import { useToastify } from '@/context/ToastifyProvider'

interface EditCompanyFormProps {
  companyId: number
  setEditCompanyForm: React.Dispatch<React.SetStateAction<number>>

  getData: () => void
}

export const EditCompanyForm = ({ companyId, setEditCompanyForm, getData }: EditCompanyFormProps) => {
  const [name, setName] = useState<string>('')
  const [rif, setRif] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')
  const [rifError, setRifError] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')
  const [addressError, setAddressError] = useState<string>('')

  const [error, setError] = useState('')

  const { notifySuccess, notifyError } = useToastify()

  const getEditData = useCallback(async () => {
    const companyData = await getCompanyById(companyId)
    setName(companyData.name)
    setRif(companyData.rif)
    setPhone(companyData.phone)
    setAddress(companyData.address)
  }, [companyId])

  const validateName = (name: string) => {
    const isValid = /^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$/.test(name)
    setNameError(isValid ? '' : 'Invalid name format (Company name example)')
    return isValid
  }

  const validateRif = (rif: string) => {
    const isValid = /^J-([0-9]{1,10})$/.test(rif)
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

    try {
      await patchCompany(name, rif, phone, address, companyId)
      notifySuccess('Company edited succesfull', { autoClose: 2500 })
      getData()
    } catch (e) {
      console.log('Error editing Company', e)
      setError('Error editing Company')
      notifyError('Error editing Company', { autoClose: 2500 })
    }
    setEditCompanyForm(0)
  }
  useEffect(() => {
    getEditData()
  }, [getEditData])
  return (
    <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
      <InputForm placeholder='Company Name' value={name} onChange={setName} onBlur={validateName} />
      {nameError && <p className='text-red-500 mt-2'>{nameError}</p>}

      <InputForm placeholder='RIF' value={rif} onChange={setRif} onBlur={validateRif} />
      {rifError && <p className='text-red-500 mt-2'>{rifError}</p>}

      <InputForm placeholder='Phone Number' value={phone} onChange={setPhone} onBlur={validatePhone} />
      {phoneError && <p className='text-red-500 mt-2'>{phoneError}</p>}

      <InputForm placeholder='Address' value={address} onChange={setAddress} onBlur={validateAddress} />
      {addressError && <p className='text-red-500 mt-2'>{addressError}</p>}

      {error && <p className='text-red-500'>{error}</p>}

      <div className='flex flex-row space-x-2 justify-center'>
        <DefaultButton type='submit'>Edit Company</DefaultButton>
        <DefaultButton
          color='btn-secondary'
          onClick={() => {
            setEditCompanyForm(0)
          }}
        >
          Back
        </DefaultButton>
      </div>
    </form>
  )
}

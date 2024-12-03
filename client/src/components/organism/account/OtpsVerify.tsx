'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useState } from 'react'
import { verifyOtps } from '@/api/otps'
import { useToastify } from '@/context/ToastifyProvider'
import { toast } from 'react-toastify'
import Loading from '@/app/Loading'

interface OtpsVerifyProps {
  email: string
  purpose: string
  getUserInfo: () => void
  toggleVerifyForm: () => void
}

export const OtpsVerify = ({ email, purpose, getUserInfo, toggleVerifyForm }: OtpsVerifyProps) => {
  const [otp, setOtp] = useState('')
  const { notifySuccess, notifyInfo, notifyError } = useToastify()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      notifyInfo(<Loading msg='Verifying' />, { autoClose: false, closeButton: false })
      await verifyOtps(email, otp, purpose)
      toast.dismiss()
      notifySuccess('Verified', { autoClose: 2500, delay: 500 })
      getUserInfo()
      toggleVerifyForm()
    } catch (e) {
      console.log('Error authenticating user', e)
      notifyError('Error authenticating user', { autoClose: 2500 })
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8 items-center'>
        <h2 className='font-bold text-2xl'>Verify</h2>

        <InputForm placeholder='Number sent to your email' value={otp} onChange={setOtp} />

        <div className='flex flex-row space-x-2'>
          <DefaultButton color='btn-primary' type='submit' className='grow'>
            Verify
          </DefaultButton>
          <DefaultButton color='btn-secondary' onClick={toggleVerifyForm}>
            Back
          </DefaultButton>
        </div>
      </form>
    </>
  )
}

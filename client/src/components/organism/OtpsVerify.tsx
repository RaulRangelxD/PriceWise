'use client'

import { Button } from '@/components/atoms/buttons/Button'
import { InputForm } from '@/components/atoms/inputs/InputForm'
import { useState } from 'react'
import { verifyOtps } from '@/api/otps'

interface OtpsVerifyProps {
  email: string
  purpose: string
  getUserInfo: () => void
  toggleVerifyForm: () => void
}

export const OtpsVerify = ({ email, purpose, getUserInfo, toggleVerifyForm }: OtpsVerifyProps) => {
  const [otp, setOtp] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await verifyOtps(email, otp, purpose)
      getUserInfo()
      toggleVerifyForm()
      alert('Verify success')
    } catch (e) {
      console.log('Error authenticating user', e)
      alert('Error')
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col space-y-4 px-4 py-8'>
        <InputForm placeholder='Number sent to your email' value={otp} onChange={setOtp} />

        <div className='flex flex-row space-x-2'>
          <Button color='btn-primary' type='submit' className='grow'>
            Verify
          </Button>
          <Button color='btn-secondary' onClick={toggleVerifyForm}>
            Back
          </Button>
        </div>
      </form>
    </>
  )
}

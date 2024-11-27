'use client'

import { Button } from '@/components/atoms/buttons/Button'
import { sendOtps } from '@/api/otps'

interface OtpsSendProps {
  email: string
  purpose: 'email_verification'
  toggleVerifyForm: () => void
}

export const OtpsSend = ({ email, purpose, toggleVerifyForm }: OtpsSendProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await sendOtps(email, purpose)
      toggleVerifyForm()
      alert('Email sended')
    } catch (e) {
      console.log('Error authenticating user', e)
      alert('Error')
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Button color='btn-secondary' type='submit'>
          Verify
        </Button>
      </form>
    </>
  )
}

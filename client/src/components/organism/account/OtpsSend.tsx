'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { sendOtps } from '@/api/otps'
import { useToastify } from '@/context/ToastifyProvider'
import { toast } from 'react-toastify'
import Loading from '@/app/Loading'
import { CheckIcon } from '@/components/atoms/icons/Check'

interface OtpsSendProps {
  email: string
  purpose: 'email_verification'
  toggleVerifyForm: () => void
}

export const OtpsSend = ({ email, purpose, toggleVerifyForm }: OtpsSendProps) => {
  const { notifySuccess, notifyInfo, notifyError } = useToastify()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      notifyInfo(<Loading msg='Sending' />, { autoClose: false, closeButton: false })
      await sendOtps(email, purpose)
      toast.dismiss()
      notifySuccess('Sended', { autoClose: 2500, delay: 500 })
      toggleVerifyForm()
    } catch (e) {
      console.log('Error authenticating user', e)
      notifyError('Error authenticating user', { autoClose: 2500 })
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DefaultButton color='btn-primary' type='submit' size='sm' className='m-2'>
          <CheckIcon size='sm' className='pe-1' />
          Verify
        </DefaultButton>
      </form>
    </>
  )
}

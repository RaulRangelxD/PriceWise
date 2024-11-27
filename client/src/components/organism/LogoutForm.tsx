'use client'

import { Button } from '@/components/atoms/buttons/Button'
import { authCheck, logout } from '@/api/auth'

interface LogoutFormProps {
  authFalse: () => void
}

export const LogoutForm = ({ authFalse }: LogoutFormProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await logout()
      authCheck()
      authFalse()
    } catch (e) {
      console.log('Error authenticating user', e)
    }
  }
  return (
    <>
      <form className='grow' onSubmit={(e) => handleSubmit(e)}>
        <Button color='btn-primary' className='w-full' type='submit'>
          Logout
        </Button>
      </form>
    </>
  )
}

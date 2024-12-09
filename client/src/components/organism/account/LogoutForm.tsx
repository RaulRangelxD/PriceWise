'use client'

import { DefaultButton } from '@/components/atoms/buttons/Button'
import { authCheck, logout } from '@/api/auth'
import { LogoutIcon } from '@/components/atoms/icons/Logout'
import { useRouter } from 'next/navigation'

interface LogoutFormProps {
  color?: 'btn-primary' | 'btn-secondary' | 'btn-third' | ''
  authFalse: () => void
}

export const LogoutForm = ({ color = 'btn-primary', authFalse }: LogoutFormProps) => {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await logout()
      await authCheck()
      authFalse()
      router.push('/')
    } catch (e) {
      console.log('Error authenticating user', e)
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DefaultButton color={color} className='w-full' type='submit'>
          <LogoutIcon /> Logout
        </DefaultButton>
      </form>
    </>
  )
}

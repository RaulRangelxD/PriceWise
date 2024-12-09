'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import Loading from '@/app/Loading'
import { authCheck } from '@/api/auth'
import { getUser } from '@/api/users'
import { LoginNavbar } from '@/components/organism/account/LoginNabvar'
import { ToastProvider } from '@/context/ToastifyProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserInfo } from '@/lib/types'

interface AccountLayoutProps {
  children: ReactNode
}

export const AccountLayout = ({ children }: AccountLayoutProps) => {
  const [auth, setAuth] = useState(false)
  const [userInContext, setUserInContext] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const authTrue = (userInfo: UserInfo) => {
    setAuth(true)
    setUserInContext(userInfo)
  }

  const authFalse = () => {
    setAuth(false)
    setUserInContext(null)
  }

  const authCheckStatus = useCallback(async () => {
    try {
      const token = await authCheck()
      if (token) {
        setAuth(true)
        const userData = await getUser()
        setUserInContext(userData)
      } else {
        setAuth(false)
        setUserInContext(null)
      }
    } catch (error) {
      console.error('Error during authentication check:', error)
      setAuth(false)
      setUserInContext(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    authCheckStatus()
  }, [authCheckStatus])

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ auth, userInContext, authTrue, authFalse }}>
        <ToastProvider>
          {loading ? (
            <div className='flex flex-col min-h-screen'>
              <Loading msg='Loading' />
            </div>
          ) : (
            <div className='relative flex flex-col min-h-screen'>
              <LoginNavbar />
              <main className='flex-1 flex'>{children}</main>
              <ToastContainer />
            </div>
          )}
        </ToastProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

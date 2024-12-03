'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import Loading from '@/app/Loading'
import { authCheck } from '@/api/auth'
import { LoginNavbar } from '@/components/organism/account/LoginNabvar'
import { ToastProvider } from '@/context/ToastifyProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface AccountLayoutProps {
  children: ReactNode
}

export const AccountLayout = ({ children }: AccountLayoutProps) => {
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const authTrue = () => setAuth(true)
  const authFalse = () => setAuth(false)

  const authCheckStatus = useCallback(async () => {
    const token = await authCheck()
    if (token) setAuth(true)
    else setAuth(false)
    setLoading(false)
  }, [])

  useEffect(() => {
    authCheckStatus()
  }, [authCheckStatus])

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ auth, authTrue, authFalse }}>
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

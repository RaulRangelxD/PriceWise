'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Loading from '@/app/Loading'
import { authCheck } from '@/api/auth'
import { LoginNavbar } from '@/components/organism/LoginNabvar'

interface RootLayoutProps {
  children: ReactNode
}

export const LoginLayout = ({ children }: RootLayoutProps) => {
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
        {loading ? (
          <div className='flex flex-col min-h-screen'>
            <Loading />
          </div>
        ) : (
          <div className='relative flex flex-col min-h-screen'>
            <LoginNavbar />
            <main className='flex-1 flex'>{children}</main>
          </div>
        )}
      </AuthContext.Provider>
    </ThemeProvider>
  )
}

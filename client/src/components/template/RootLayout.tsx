'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import { Navbar } from '@/components/organism/Nabvar'
import { Footer } from '@/components/organism/Footer'
import Loading from '@/app/Loading'
import { authCheck } from '@/api/auth'
import { ToastProvider } from '@/context/ToastifyProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { NextUIProvider } from '@nextui-org/system'

interface RootLayoutProps {
  children: ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
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
    <ToastProvider>
      <NextUIProvider>
        <ThemeProvider>
          <AuthContext.Provider value={{ auth, authTrue, authFalse }}>
            {loading ? (
              <div className='flex flex-col min-h-screen'>
                <Loading msg='Loading' />
              </div>
            ) : (
              <div className='flex flex-col min-h-screen'>
                <Navbar />
                <main className='flex-1 flex'>{children}</main>
                <ToastContainer />

                <Footer />
              </div>
            )}
          </AuthContext.Provider>
        </ThemeProvider>
      </NextUIProvider>
    </ToastProvider>
  )
}

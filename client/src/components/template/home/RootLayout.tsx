'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthProvider'
import { ThemeProvider } from '@/context/ThemeProvider'
import { Navbar } from '@/components/organism/Nabvar'
import { Footer } from '@/components/organism/Footer'
import Loading from '@/app/Loading'
import { authCheck } from '@/api/auth'
import { getUser } from '@/api/users'
import { ToastProvider } from '@/context/ToastifyProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { NextUIProvider } from '@nextui-org/system'
import { UserInfo } from '@/lib/types'

interface RootLayoutProps {
  children: ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
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
    <ToastProvider>
      <NextUIProvider>
        <ThemeProvider>
          <AuthContext.Provider value={{ auth, userInContext, authTrue, authFalse }}>
            {loading ? (
              <div className='flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-orange-500 dark:bg-gradient-to-b dark:from-sky-700 dark:to-violet-600'>
                <Loading msg='Loading' />
              </div>
            ) : (
              <div className='flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-orange-500 dark:bg-gradient-to-b dark:from-sky-700 dark:to-violet-600'>
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

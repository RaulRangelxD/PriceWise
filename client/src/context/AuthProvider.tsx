import { UserInfo } from '@/lib/types'
import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  auth: boolean
  userInContext: UserInfo | null
  authTrue: (userInfo: UserInfo) => void
  authFalse: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState(false)
  const [userInContext, setUserInContext] = useState<UserInfo | null>(null)

  const authTrue = (userInfo: UserInfo) => {
    console.log('Setting user info:', userInfo)
    setAuth(true)
    setUserInContext(userInfo)
  }

  const authFalse = () => {
    setAuth(false)
    setUserInContext(null)
  }

  return <AuthContext.Provider value={{ auth, userInContext, authTrue, authFalse }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

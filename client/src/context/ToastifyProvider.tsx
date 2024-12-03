'use client'

import { createContext, ReactNode, useContext } from 'react'
import { toast, ToastOptions } from 'react-toastify'

export interface ToastContextType {
  notifySuccess: (message: ReactNode | string, props?: ToastOptions) => void
  notifyError: (message: ReactNode | string, props?: ToastOptions) => void
  notifyInfo: (message: ReactNode | string, props?: ToastOptions) => void
  notifyWarning: (message: ReactNode | string, props?: ToastOptions) => void
  clearToasts: () => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export const useToastify = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastify must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultOptions: ToastOptions = { position: 'top-center', autoClose: 5000 }

  const notifySuccess = (message: ReactNode | string, props?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...props })
  }

  const notifyError = (message: ReactNode | string, props?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...props })
  }

  const notifyInfo = (message: ReactNode | string, props?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...props })
  }

  const notifyWarning = (message: ReactNode | string, props?: ToastOptions) => {
    toast.warn(message, { ...defaultOptions, ...props })
  }

  const clearToasts = () => {
    toast.dismiss()
  }

  return <ToastContext.Provider value={{ notifySuccess, notifyError, notifyInfo, notifyWarning, clearToasts }}>{children}</ToastContext.Provider>
}

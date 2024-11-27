import type { Metadata } from 'next'
import '@/app/globals.css'
import { LoginLayout } from '@/components/template/LoginLayout'

export const metadata: Metadata = {
  title: 'Perro Login',
  description: 'Created by RaulRangelxD',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' className='dark'>
      <body className='min-h-screen'>
        <LoginLayout>{children}</LoginLayout>
      </body>
    </html>
  )
}

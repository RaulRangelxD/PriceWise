import type { Metadata } from 'next'
import '@/app/globals.css'
import { AccountLayout } from '@/components/template/account/AccountLayout'

export const metadata: Metadata = {
  title: 'Login Price Wise',
  description: 'Created by RaulRangelxD',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' className='dark'>
      <body className='min-h-screen'>
        <AccountLayout>{children}</AccountLayout>
      </body>
    </html>
  )
}

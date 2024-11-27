'use client'

import { useTheme } from '@/context/ThemeContext'

import { IconButton } from '@/components/molecules/IconButton'

import { SunIcon } from '@/components/atoms/icons/Sun'
import { MoonIcon } from '@/components/atoms/icons/Moon'

export const LoginNavbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className='absolute top-0 flex flex-row px-3 py-2 w-full bg-transparent'>
      <div className='grow'></div>
      <IconButton onClick={toggleTheme} color='btn-third' Icon={theme === 'light' ? <SunIcon size='sm' /> : <MoonIcon size='sm' />} />
    </nav>
  )
}

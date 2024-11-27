'use client'

import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'

import { IconLink } from '@/components/molecules/IconLink'
import { IconButton } from '@/components/molecules/IconButton'

import { HomeIcon } from '@/components/atoms/icons/Home'
import { UserIcon } from '@/components/atoms/icons/User'
import { SunIcon } from '@/components/atoms/icons/Sun'
import { MoonIcon } from '@/components/atoms/icons/Moon'

export const Navbar = () => {
  const { auth } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className='sticky top-0 flex flex-row space-x-2 px-3 py-2 w-full bg-neutral-500 bg-opacity-10 backdrop-blur-[3px]'>
      <IconLink href='/' Icon={<HomeIcon />} />
      <div className='grow'></div>
      {auth ? <IconLink href='/account' Icon={<UserIcon />} /> : <IconLink href='/account' Icon={<UserIcon />} />}
      <IconButton onClick={toggleTheme} color='btn-third' Icon={theme === 'light' ? <SunIcon size='sm' /> : <MoonIcon size='sm' />} />
    </nav>
  )
}

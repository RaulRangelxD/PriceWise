interface LogoutIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const LogoutIcon = ({ size = 'md', color = '', className = '' }: LogoutIconProps) => (
  <svg className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color} ${className}`} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
  </svg>
)
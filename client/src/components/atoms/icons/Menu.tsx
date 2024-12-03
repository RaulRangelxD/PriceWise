interface MenuIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const MenuIcon = ({ size = 'md', color = '', className = '' }: MenuIconProps) => (
  <svg className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color} ${className}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
  </svg>
)

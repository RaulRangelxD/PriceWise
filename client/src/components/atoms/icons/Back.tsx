interface BackIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const BackIcon = ({ size = 'md', color = '', className = '' }: BackIconProps) => (
  <svg className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color} ${className}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
  </svg>
)

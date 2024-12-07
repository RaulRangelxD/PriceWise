interface EyeIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const EyeIcon = ({ size = 'md', color = '', className = '' }: EyeIconProps) => (
  <svg
    className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color} ${className}`}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {' '}
    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' /> <circle cx='12' cy='12' r='3' />
  </svg>
)

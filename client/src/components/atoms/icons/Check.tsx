interface CheckIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const CheckIcon = ({ size = 'md', color = '', className = '' }: CheckIconProps) => (
  <svg
    className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color} ${className}`}
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {' '}
    <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='9' /> <path d='M9 12l2 2l4 -4' />
  </svg>
)

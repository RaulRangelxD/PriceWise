interface HomeIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const HomeIcon = ({ size = 'md', color = '' }: HomeIconProps) => (
  <svg
    className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color}`}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {' '}
    <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' /> <polyline points='9 22 9 12 15 12 15 22' />
  </svg>
)

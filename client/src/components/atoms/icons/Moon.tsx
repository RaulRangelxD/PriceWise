interface MoonIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const MoonIcon = ({ size = 'md', color = '' }: MoonIconProps) => (
  <svg
    className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color}`}
    viewBox='0 0 24 24'
    strokeWidth='2'
    stroke='currentColor'
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    {' '}
    <path stroke='none' d='M0 0h24v24H0z' /> <path d='M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12' />
  </svg>
)

interface SunIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const SunIcon = ({ size = 'md', color = '' }: SunIconProps) => (
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
    <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='12' cy='12' r='4' /> <path d='M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7' />
  </svg>
)

interface InfoIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const InfoIcon = ({ size = 'md', color = '' }: InfoIconProps) => (
  <svg
    className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color}`}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10' /> <line x1='12' y1='16' x2='12' y2='12' /> <line x1='12' y1='8' x2='12.01' y2='8' />
  </svg>
)

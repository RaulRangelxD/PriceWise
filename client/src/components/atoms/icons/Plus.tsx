interface PlusIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const PlusIcon = ({ size = 'md', color = '' }: PlusIconProps) => (
  <svg className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color}`} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
  </svg>
)

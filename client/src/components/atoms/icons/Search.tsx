interface SearchIconProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const SearchIcon = ({ size = 'md', color = '', className = '' }: SearchIconProps) => (
  <svg className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} ${color} ${className}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
  </svg>
)

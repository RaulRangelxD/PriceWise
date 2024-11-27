interface ButtonProps {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  color?: 'btn-primary' | 'btn-secondary' | 'btn-third'
  className?: string
  children: React.ReactNode
}

export const Button = ({ onClick, type = undefined, color = 'btn-primary', className, children }: ButtonProps) => (
  <button onClick={onClick} type={type} className={`${color} ${className}`}>
    {children}
  </button>
)

import { Button } from '../atoms/buttons/Button'

interface IconButtonProps {
  onClick: () => void
  color?: 'btn-primary' | 'btn-secondary' | 'btn-third'
  className?: string
  Icon: React.ReactNode
}

export const IconButton = ({ onClick, color = 'btn-primary', className, Icon }: IconButtonProps) => (
  <Button onClick={onClick} color={color} className={className}>
    {Icon}
  </Button>
)

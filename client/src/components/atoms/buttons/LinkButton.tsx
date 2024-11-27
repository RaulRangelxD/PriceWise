import Link from 'next/link'

interface LinkButtonProps {
  href: string
  type?: 'btn-primary' | 'btn-secondary' | 'btn-third'
  children: React.ReactNode
}

export const LinkButton = ({ href, type = 'btn-third', children }: LinkButtonProps) => (
  <Link href={href} className={`${type}`}>
    {children}
  </Link>
)

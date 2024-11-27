import { LinkButton } from '../atoms/buttons/LinkButton'

interface IconLinkProps {
  href: string
  Icon: React.ReactNode
}

export const IconLink = ({ href, Icon }: IconLinkProps) => <LinkButton href={href}>{Icon}</LinkButton>

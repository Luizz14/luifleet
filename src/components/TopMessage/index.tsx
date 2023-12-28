import { useTheme } from 'styled-components'
import { IconBoxProps } from '../ButtonIcon'
import { Container, Title } from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TopMessageProps = {
  icon?: IconBoxProps
  title: string
}

export function TopMessage({ icon: Icon, title }: TopMessageProps) {
  const { COLORS } = useTheme()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top - 8

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={18} color={COLORS.GRAY_100} />}
      <Title>{title}</Title>
    </Container>
  )
}

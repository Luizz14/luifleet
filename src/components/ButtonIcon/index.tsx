import { IconProps } from 'phosphor-react-native'
import { Container } from './styles'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'

export type IconBoxProps = (props: IconProps) => JSX.Element

type ButtonIconProps = TouchableOpacityProps & {
  icon: IconBoxProps
}

export function ButtonIcon({ icon: Icon, ...rest }: ButtonIconProps) {
  const { COLORS } = useTheme()

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Icon size={24} color={COLORS.BRAND_LIGHT} weight='bold' />
    </Container>
  )
}

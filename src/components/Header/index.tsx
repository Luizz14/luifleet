import { TouchableOpacity } from 'react-native'
import { Container, Title } from './styles'
import { ArrowLeft } from 'phosphor-react-native'
import { useTheme } from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { COLORS } = useTheme()
  const { goBack } = useNavigation()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 42

  return (
    <Container style={{ paddingTop }}>
      <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
        <ArrowLeft size={24} weight='bold' color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <Title>{title}</Title>
    </Container>
  )
}

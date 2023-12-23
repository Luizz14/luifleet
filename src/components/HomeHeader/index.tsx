import { TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Power } from 'phosphor-react-native'

import theme from '../../theme'
import { Container, Greeling, Message, Name, Picture } from './styles'
import { useApp, useUser } from '@realm/react'

export function HomeHeader() {
  const user = useUser()
  const app = useApp()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top + 22

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder={'LEHLh[WB2yk8pyoJadR*.7kCMdnj'}
      />

      <Greeling>
        <Message>Olá,</Message>

        <Name>{user?.profile.name}</Name>
      </Greeling>

      <TouchableOpacity onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}

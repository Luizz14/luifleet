import { Container, Slogan, Title } from './styles'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import { useState } from 'react'
import { Alert } from 'react-native'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
      } else {
        Alert.alert('Error!', 'Não foi possível entrar na sua conta google')
      }
    } catch (error) {
      Alert.alert('Error!', 'Não foi possível entrar na sua conta google')
      setIsAuthenticating(false)
    }
  }
  return (
    <Container source={backgroundImg}>
      <Title>Lui Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title='Entrar com Google'
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  )
}

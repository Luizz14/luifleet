import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useState } from 'react'
import { Alert } from 'react-native'

import { Realm, useApp } from '@realm/react'

import { Container, Slogan, Title } from './styles'

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env'
import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
        const credential = Realm.Credentials.jwt(idToken)

        await app.logIn(credential)
      } else {
        throw new Error()
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

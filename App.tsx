import 'react-native-get-random-values'

import { AppProvider, UserProvider } from '@realm/react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { ThemeProvider } from 'styled-components/native'

import { REALM_APP_ID } from '@env'
import THEME from './src/theme'

import { RealmProvider } from './src/libs/realm'
import { Routes } from './src/routes'
import { SignIn } from './src/sreens/SignIn'

import { Loading } from './src/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts([Roboto_700Bold, Roboto_400Regular])

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={THEME}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: THEME.COLORS.GRAY_800 }}
        >
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'transparent'}
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}

import { ThemeProvider } from 'styled-components/native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { SignIn } from './src/sreens/SignIn'

import { Loading } from './src/components/Loading'
import { StatusBar } from 'react-native'
import THEME from './src/theme'

export default function App() {
  const [fontsLoaded] = useFonts([Roboto_400Regular, Roboto_700Bold])

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <ThemeProvider theme={THEME}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <SignIn />
    </ThemeProvider>
  )
}

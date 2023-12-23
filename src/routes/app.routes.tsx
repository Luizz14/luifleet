import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../sreens/Home'
import { Departure } from '../sreens/Departure'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} options={{ animation: 'ios' }} />

      <Screen
        name='departure'
        component={Departure}
        options={{ animation: 'ios' }}
      />
    </Navigator>
  )
}

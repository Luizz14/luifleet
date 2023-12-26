import { useNavigation } from '@react-navigation/native'

import { Container, Content } from './styles'
import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'

import { useQuery } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { useEffect } from 'react'

export function Home() {
  const { navigate } = useNavigation()
  const historic = useQuery(Historic)

  function handleRegisterMovement() {
    navigate('departure')
  }

  function fetchVehicle() {
    const vehicle = historic.filtered("status = 'departure'")[0]

    console.log(vehicle)
  }

  useEffect(() => {
    fetchVehicle()
  }, [])

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  )
}

import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { BSON } from 'realm'
import { X } from 'phosphor-react-native'

import {
  AsyncMessage,
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

import { LatLng } from 'react-native-maps'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/asyncStorage'
import { getStorageLocation } from '../../libs/asyncStorage/locationStorage'

import { Map } from '../../components/Map'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Locations } from '../../components/Locations'
import { ButtonIcon } from '../../components/ButtonIcon'
import { LocationInfoProps } from '../../components/LocationInfo'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'
import dayjs from 'dayjs'
import { Loading } from '../../components/Loading'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [cordinates, setCordinates] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationInfoProps>(
    {} as LocationInfoProps
  )
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const { goBack } = useNavigation()
  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
  const realm = useRealm()

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => RemoveVehicleUsage() },
    ])
  }

  async function RemoveVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    await stopLocationTask()

    goBack()
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Error',
          'Não foi possível obter os dados para registrar a chegada do veículo!'
        )
      }

      const locations = await getStorageLocation()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
        historic.coords.push(...locations)
      })

      await stopLocationTask()

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')

      goBack()
    } catch (error) {
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo!')
    }
  }

  async function getLocationsInfo() {
    if (!historic) return

    setIsLoading(true)

    const lastSync = await getLastAsyncTimestamp()
    const updatedAt = historic!.updated_at.getTime()

    setDataNotSynced(updatedAt > lastSync)

    console.log(historic?.status)
    if (historic?.status === 'departure') {
      const locationsStorage = await getStorageLocation()
      setCordinates(locationsStorage)
    } else {
      const coords: LatLng[] =
        historic?.coords.map((item) => {
          return {
            latitude: item.latitude,
            longitude: item.longitude,
          }
        }) ?? []
      setCordinates(coords)
      console.log(historic?.coords)
    }

    if (historic?.coords[0]) {
      const departureStreet = await getAddressLocation(historic?.coords[0])
      setDeparture({
        label: `Saindo em ${departureStreet ?? ''}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format(
          'DD/MM/YYYY [ás] HH:mm'
        ),
      })
    }

    if (historic?.status === 'arrival') {
      const lastLocation = historic?.coords[historic?.coords.length - 1]
      const arrivalStreet = await getAddressLocation(lastLocation)

      setArrival({
        label: `Chegando em ${arrivalStreet ?? ''}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format(
          'DD/MM/YYYY [ás] HH:mm'
        ),
      })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getLocationsInfo()
  }, [historic])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Header title={title} />

      {cordinates.length > 0 && <Map cordinates={cordinates} />}

      <Content>
        <Locations departure={departure} arrival={arrival} />
        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

          <Button title='Registrar chegada' onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sincronização da
          {historic?.status === 'departure' ? ' partida ' : ' chegada '}
          pendente
        </AsyncMessage>
      )}
    </Container>
  )
}

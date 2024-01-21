import { Alert, ScrollView, TextInput } from 'react-native'
import { useUser } from '@realm/react'
import { useEffect, useRef, useState } from 'react'
import {
  getBackgroundPermissionsAsync,
  LocationAccuracy,
  useForegroundPermissions,
  watchPositionAsync,
  LocationSubscription,
  LocationObjectCoords,
} from 'expo-location'
import { useNavigation } from '@react-navigation/native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Historic } from '../../libs/realm/schemas/Historic'
import { Car } from 'phosphor-react-native'

import { Map } from '../../components/Map'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { TextAreaInput } from '../../components/TextAreaInput'
import { LicensePlateInput } from '../../components/LicensePlateInput'

import { Container, Content, Message } from './styles'
import { licensePlateValidade } from '../../utils/licensePlateValidate'

import { useRealm } from '../../libs/realm'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { startLocationTask } from '../../tasks/backgroundLocationTask'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCordinates, setCurrentCordinates] =
    useState<LocationObjectCoords | null>(null)

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions()

  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  const descriptionInputRef = useRef<TextInput>(null)
  const licensePlateInputRef = useRef<TextInput>(null)

  async function handleDepartureRegister() {
    try {
      if (!licensePlateValidade(licensePlate)) {
        licensePlateInputRef.current?.focus()

        return Alert.alert(
          'Placa inválida',
          'A placa é inválida. Por favor, informe a placa correta do veículo'
        )
      }

      if (description.trim().length === 0) {
        descriptionInputRef.current?.focus()

        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo.'
        )
      }

      if (!currentCordinates?.latitude || !currentCordinates?.longitude) {
        return Alert.alert(
          'Localização',
          'Não foi possível obter a localização atual. Por favor, tente novamente.'
        )
      }

      setIsRegistering(true)

      const backgorundPermission = await getBackgroundPermissionsAsync()

      if (!backgorundPermission.granted) {
        setIsRegistering(true)

        return Alert.alert(
          'Permissão',
          'Você precisa permitir que o aplicativo tenha acesso a localização em segundo plano para utilizar essa funcionalidade. Por favor permita o acesso a localização em segundo plano nas configurações do seu dispositivo.'
        )
      }

      await startLocationTask()

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
            coords: [
              {
                latitude: currentCordinates.latitude,
                longitude: currentCordinates.longitude,
                timestamp: new Date().getTime(),
              },
            ],
          })
        )
      })

      Alert.alert(
        'Saída do veículo cadastrado com sucesso',
        'A saída do seu seu veículo foi cadastrado com sucesso.'
      )
      goBack()
    } catch (error) {
      console.log(error)

      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo.')
    } finally {
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [])

  useEffect(() => {
    if (!locationForegroundPermission?.granted) return

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.BestForNavigation,
        timeInterval: 1000,
      },
      (location) => {
        setCurrentCordinates(location.coords)
        getAddressLocation(location.coords)
          .then((address) => {
            if (address) setCurrentAddress(address)
            console.log(address)
          })
          .finally(() => {
            setIsLoadingLocation(false)
          })
      }
    ).then((response) => (subscription = response))

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [locationForegroundPermission])

  if (isLoadingLocation) {
    return (
      <Container>
        <Header title='Saída' />

        <Loading />
      </Container>
    )
  }

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title='Saída' />

        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          utilizar essa funcionalidade. Por favor permita o acesso a localização
          nas configurações do seu dispositivo.
        </Message>
      </Container>
    )
  }

  return (
    <Container>
      <Header title='Saída' />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {currentCordinates && <Map cordinates={[currentCordinates]} />}

          <Content>
            {currentAddress && (
              <LocationInfo
                icon={Car}
                label='Localização atual'
                description={currentAddress}
              />
            )}

            <LicensePlateInput
              ref={licensePlateInputRef}
              onSubmitEditing={() => descriptionInputRef.current?.focus()}
              returnKeyType='next'
              label='Placa do veículo'
              placeholder='BRA1234'
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionInputRef}
              label='Finalidade'
              placeholder='Vou utilizar o veículo para ...'
              returnKeyType='send'
              blurOnSubmit
              onSubmitEditing={() => handleDepartureRegister}
              onChangeText={setDescription}
            />

            <Button
              title='Registrar saída'
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}

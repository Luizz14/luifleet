import { Alert, Platform, ScrollView, TextInput } from 'react-native'
import { useUser } from '@realm/react'
import { useEffect, useRef, useState } from 'react'
import {
  LocationAccuracy,
  useForegroundPermissions,
  watchPositionAsync,
  LocationSubscription,
} from 'expo-location'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Historic } from '../../libs/realm/schemas/Historic'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Container, Content, Message } from './styles'

import { licensePlateValidade } from '../../utils/licensePlateValidate'

import { useNavigation } from '@react-navigation/native'
import { useRealm } from '../../libs/realm'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { Loading } from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { Car } from 'phosphor-react-native'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)

  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions()

  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  const descriptionInputRef = useRef<TextInput>(null)
  const licensePlateInputRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
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

      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
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
        subscription?.remove()
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

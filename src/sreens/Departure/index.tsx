import { Alert } from 'react-native'
import { useRef, useState } from 'react'

import { Historic } from '../../libs/realm/schemas/Historic'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Container, Content } from './styles'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native'
import { licensePlateValidade } from '../../utils/licensePlateValidate'
import { useRealm, useUser } from '@realm/react'
import { useNavigation } from '@react-navigation/native'

const KeyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

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

  return (
    <Container>
      <Header title='Saída' />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={KeyboardAvoidingViewBehavior}
      >
        <ScrollView>
          <Content>
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
      </KeyboardAvoidingView>
    </Container>
  )
}

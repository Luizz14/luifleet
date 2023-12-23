import { useRef, useState } from 'react'

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
import { Alert } from 'react-native'

const KeyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')

  const descriptionInput = useRef<TextInput>(null)
  const licensePlateInput = useRef<TextInput>(null)

  function handleDepartureRegister() {
    if (!licensePlateValidade(licensePlate)) {
      return Alert.alert(
        'Placa inválida',
        'A placa é inválida. Por favor, informe a placa correta do veículo'
      )
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
              ref={licensePlateInput}
              onSubmitEditing={() => descriptionInput.current?.focus()}
              returnKeyType='next'
              label='Placa do veículo'
              placeholder='BRA1234'
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionInput}
              label='Finalidade'
              placeholder='Vou utilizar o veículo para ...'
              returnKeyType='send'
              blurOnSubmit
              onSubmitEditing={() => handleDepartureRegister}
              onChangeText={setDescription}
            />

            <Button title='Registrar saída' onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}

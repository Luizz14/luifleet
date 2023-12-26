import { forwardRef } from 'react'
import { useTheme } from 'styled-components'
import { TextInput, TextInputProps } from 'react-native'

import { Container, Input, Label } from './styles'

type LicensePlateInputProps = TextInputProps & {
  label: string
}

const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(
  ({ label, ...rest }, ref) => {
    const { COLORS } = useTheme()

    return (
      <Container>
        <Label>{label}</Label>

        <Input
          maxLength={7}
          autoCapitalize='characters'
          placeholderTextColor={COLORS.GRAY_400}
          {...rest}
        />
      </Container>
    )
  }
)
export { LicensePlateInput }

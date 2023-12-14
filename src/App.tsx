import { ThemeProvider } from 'styled-components'
import { SignIn } from './sreens/SignIn/intex'
import theme from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  )
}

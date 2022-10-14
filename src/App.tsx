import * as React from 'react'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import RootNavigation from './navigation'
import 'database'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
}

const App = () => (
  <PaperProvider theme={theme}>
    <RootNavigation />
  </PaperProvider>
)

export default App

import * as React from 'react'
import { DefaultTheme, Provider as ReactNativePaperProvider } from 'react-native-paper'
import { NativeBaseProvider } from 'native-base'
import RootNavigation from 'navigation'
import AuthProvider from './providers/AuthProvider'

const App = () => (
  <NativeBaseProvider>
    <ReactNativePaperProvider theme={DefaultTheme}>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </ReactNativePaperProvider>
  </NativeBaseProvider>
)

export default App

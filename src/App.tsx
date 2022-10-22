import * as React from 'react'
import 'database'
import { AuthProvider } from './context/authProvider'
import RootNavigation from 'navigation'
import { NativeBaseProvider } from 'native-base'
import { DefaultTheme, Provider as ReactNativePaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <NativeBaseProvider>
      <ReactNativePaperProvider theme={DefaultTheme}>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </ReactNativePaperProvider>
    </NativeBaseProvider>
  )
}

export default App

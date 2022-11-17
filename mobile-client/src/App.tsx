import * as React from 'react'
import { DefaultTheme, Provider as ReactNativePaperProvider } from 'react-native-paper'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { NativeBaseProvider } from 'native-base'
import RootNavigation from 'navigation'
import AuthProvider from './providers/AuthProvider'

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <NativeBaseProvider>
      <ReactNativePaperProvider theme={DefaultTheme}>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </ReactNativePaperProvider>
    </NativeBaseProvider>
  </ApolloProvider>
)

export default App

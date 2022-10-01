import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Component } from './components/Component'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working o</Text>
      <StatusBar style="auto" />
      <Component />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App

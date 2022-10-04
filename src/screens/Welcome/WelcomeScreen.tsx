import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flex: 1,
  },

  button: {
    marginTop: 10,
  },
})

const WelcomeScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Welcome screen!</Text>
    <View style={styles.buttons}>
      <Button
        title="Sign in"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Sign In')}
      />
      <Button
        title="Sign up"
        type="outline"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Sign Up')}
      />
    </View>
  </View>
)

export default WelcomeScreen

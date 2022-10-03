import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, TextInput } from 'react-native-paper'

const auth = getAuth()

const SignUpScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      })
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password)
      navigation.navigate('Sign In')
    } catch (error) {
      const { message } = error as Error
      setValue({
        ...value,
        error: message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up screen!</Text>
      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}
      <View style={styles.controls}>
        <TextInput
          placeholder="Email"
          style={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <TextInput
          placeholder="Password"
          style={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />
        <Button style={styles.control} onPress={signUp}>
          Sign up
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    flex: 1,
  },
  control: {
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
})

export default SignUpScreen

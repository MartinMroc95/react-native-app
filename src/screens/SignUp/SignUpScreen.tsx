import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, TextInput } from 'react-native-paper'
import { FirebaseError } from '@firebase/util'

const auth = getAuth()

const SignUpScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })

  const signUp = async () => {
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
      if (error instanceof FirebaseError) {
        const { message } = error
        setValue({
          ...value,
          error: message,
        })
      }
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
          mode="outlined"
          placeholder="Email"
          style={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <TextInput
          mode="outlined"
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
    width: 200,
    maxHeight: 60,
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

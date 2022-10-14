import * as React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { FirebaseError } from '@firebase/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { signInValidationScheme } from './constants'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    width: 200,
    maxHeight: 60,
    marginTop: 10,
  },
  error: {
    color: 'red',
  },
  linkControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
})

const auth = getAuth()

type SignInFormData = {
  email: string
  password: string
}

const SignInScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signInValidationScheme),
  })

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('error', error.message)
        throw new Error(error.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            mode="outlined"
            style={styles.control}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            mode="outlined"
            style={styles.control}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      <Button
        mode="contained"
        style={styles.control}
        onPress={() => {
          void handleSubmit(onSubmit)()
        }}
      >
        Sign in
      </Button>
      <View style={styles.linkControl}>
        <Text style={{ paddingRight: 5 }}>Not a member?</Text>
        <Link style={{ color: 'blue' }} to={{ screen: 'Sign Up' }}>
          Sign Up!
        </Link>
      </View>
      <Text style={{ paddingTop: 10, paddingBottom: 10 }}>------ OR ------</Text>
    </View>
  )
}

export default SignInScreen

import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { FirebaseError } from '@firebase/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { signUpValidationScheme, styles } from './constants'

type SignUpFormData = {
  email: string
  password: string
}

const auth = getAuth()

const SignUpScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpValidationScheme),
  })

  const onSubmit: SubmitHandler<SignUpFormData> = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigation.navigate('Sign In')
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('error', error.message)
        throw new Error(error.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
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
          mode="elevated"
          style={styles.control}
          onPress={() => {
            void handleSubmit(onSubmit)()
          }}
        >
          Sign up
        </Button>
      </View>
    </View>
  )
}

export default SignUpScreen

import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FirebaseError } from '@firebase/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
  WarningOutlineIcon,
} from 'native-base'
import { Routes, UnAuthStackParamList } from 'navigation/constants'
import { defaultSignUpFormValues, signUpValidationScheme } from './constants'
import FormTextInput from 'components/FormTextInput'
import FormPasswordInput from 'components/FormPasswordInput'

type SignUpFormData = {
  email?: string
  password?: string
  confirmPassword?: string
}

type SignUpProps = NativeStackScreenProps<UnAuthStackParamList, Routes.SignUp>

const SignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
  const auth = getAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: defaultSignUpFormValues,
    resolver: yupResolver(signUpValidationScheme),
  })

  const onSubmit: SubmitHandler<SignUpFormData> = async ({ email, password }) => {
    try {
      if (email && password) {
        await createUserWithEmailAndPassword(auth, email, password)
        navigation.navigate(Routes.SignIn)
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('error', error.message)
        // throw new Error(error.message)
      }
    }
  }

  return (
    <Center bgColor="white" flex={1} w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={2} mt="5">
          <FormTextInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter email"
            errorMessage={errors.email && errors.email.message}
          />
          <FormPasswordInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter password"
            errorMessage={errors.password && errors.password.message}
          />
          <FormPasswordInput
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter confirm password"
            errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          />
          <Button
            onPress={() => {
              void handleSubmit(onSubmit)()
            }}
            mt="4"
            colorScheme="indigo"
          >
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}

export default SignUpScreen

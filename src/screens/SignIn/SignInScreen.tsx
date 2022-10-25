import * as React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FirebaseError } from '@firebase/util'
import { yupResolver } from '@hookform/resolvers/yup'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base'
import { Routes, UnAuthStackParamList } from 'navigation/constants'
import { useAuth } from 'providers/AuthProvider'
import { defaultSignInFormValues, signInValidationScheme } from './constants'

type SignInFormData = {
  email: string
  password: string
}

type SignInProps = NativeStackScreenProps<UnAuthStackParamList, Routes.SignIn>

const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const auth = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: defaultSignInFormValues,
    resolver: yupResolver(signInValidationScheme),
  })

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    try {
      await auth.signIn({ email, password })
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('error', error.message)
        // throw new Error(error.message)
      }
    }
  }

  console.log('errors', errors)

  return (
    <Center bgColor="white" flex={1} w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>
        <VStack space={2} mt="5">
          <FormControl isInvalid={!!errors.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="text"
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.email && errors.email.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  type="password"
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {errors.password && errors.password.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            alignSelf="flex-end"
            mt="1"
            onPress={() => {
              navigation.navigate(Routes.SignUp)
            }}
          >
            Forget Password?
          </Link>
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              void handleSubmit(onSubmit)()
            }}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => {
                navigation.navigate(Routes.SignUp)
              }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  )
}

export default SignInScreen

import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FirebaseError } from '@firebase/util'
import { yupResolver } from '@hookform/resolvers/yup'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Box, Button, Center, Heading, HStack, Link, Text, useToast, VStack } from 'native-base'
import { Routes, UnAuthStackParamList } from 'navigation/constants'
import FormPasswordInput from 'components/FormPasswordInput'
import FormTextInput from 'components/FormTextInput'
import { useAuth } from 'providers/AuthProvider'
import { defaultSignInFormValues, signInValidationScheme } from './constants'

type SignInFormData = {
  email?: string
  password?: string
}

type SignInScreenNavigationProps = NativeStackNavigationProp<UnAuthStackParamList, Routes.SignIn>

type Props = {
  navigation: SignInScreenNavigationProps
}

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const auth = useAuth()
  const toast = useToast()

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
      await auth.signIn(email, password)
    } catch (error) {
      const err = error as FirebaseError
      toast.show({
        render: () => (
          <Box alignItems="center" bg="error.500" p="2" rounded="sm">
            <Text maxWidth="xs" color="white">
              {err.message}
            </Text>
          </Box>
        ),
      })
    }
  }

  return (
    <Center bgColor="white" flex={1} w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
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
          <Link
            mt="1"
            _text={{
              fontWeight: '600',
              color: 'blue.600',
            }}
            alignSelf="flex-end"
            onPress={() => {
              navigation.navigate(Routes.ForgotPassword)
            }}
          >
            Forgot Password?
          </Link>
          <Button
            mt="2"
            onPress={() => {
              void handleSubmit(onSubmit)()
            }}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text color="coolGray.600">I am a new user.</Text>
            <Link
              _text={{
                color: 'blue.600',
                fontWeight: '600',
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

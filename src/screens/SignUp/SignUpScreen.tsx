import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FirebaseError } from '@firebase/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
  WarningOutlineIcon,
} from 'native-base'
import { Routes, UnAuthStackParamList } from 'navigation/constants'
import FormPasswordInput from 'components/FormPasswordInput'
import FormTextInput from 'components/FormTextInput'
import { defaultSignUpFormValues, signUpValidationScheme } from './constants'

type SignUpFormData = {
  email?: string
  password?: string
  confirmPassword?: string
}

type SignUpScreenNavigationProps = NativeStackNavigationProp<UnAuthStackParamList, Routes.SignUp>

type Props = {
  navigation: SignUpScreenNavigationProps
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const auth = getAuth()
  const toast = useToast()

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
      const err = error as FirebaseError
      toast.show({
        render: () => (
          <HStack space="2" alignItems="center" bg="error.500" p="2" rounded="sm">
            <WarningOutlineIcon color="white" size="xs" />
            <Text color="white">{err.message}</Text>
          </HStack>
        ),
      })
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
            mt="4"
            onPress={() => {
              void handleSubmit(onSubmit)()
            }}
          >
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}

export default SignUpScreen

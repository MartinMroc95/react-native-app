import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FirebaseError } from '@firebase/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
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
import FormTextInput from 'components/FormTextInput'
import { defaultSignUpFormValues, signUpValidationScheme } from 'screens/SignUp/constants'

type ForgotPasswordFormData = {
  email?: string
}

type ForgotPasswordScreenNavigationProps = NativeStackNavigationProp<
  UnAuthStackParamList,
  Routes.SignUp
>

type Props = {
  navigation: ForgotPasswordScreenNavigationProps
}

const ForgotPasswordScreen: React.FC<Props> = () => {
  const auth = getAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: defaultSignUpFormValues,
    resolver: yupResolver(signUpValidationScheme),
  })

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
    try {
      if (email) {
        await sendPasswordResetEmail(auth, email)
        toast.show({
          render: () => (
            <HStack space="2" alignItems="center" bg="success.500" p="2" rounded="sm">
              <WarningOutlineIcon color="white" size="xs" />
              <Text color="white">Email has been sent successfully.</Text>
            </HStack>
          ),
        })
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
          Forgot Password?
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
          Provide your account's email for which you want to reset your password.
        </Heading>
        <VStack space={2} mt="5">
          <FormTextInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter email"
            errorMessage={errors.email && errors.email.message}
          />
          <Button
            mt="4"
            onPress={() => {
              void handleSubmit(onSubmit)()
            }}
          >
            Submit
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}

export default ForgotPasswordScreen

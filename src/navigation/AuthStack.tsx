import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgotPasswordScreen from 'screens/ForgotPassword'
import SignInScreen from 'screens/SignIn'
import SignUpScreen from 'screens/SignUp'
import { Routes, UnAuthStackParamList } from './constants'

const Stack = createNativeStackNavigator<UnAuthStackParamList>()

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={Routes.SignIn} component={SignInScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AuthStack

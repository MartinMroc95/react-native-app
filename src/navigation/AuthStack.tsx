import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignIn'
import SignOutScreen from '../screens/SignUp'
import WelcomeScreen from '../screens/Welcome'

const Stack = createNativeStackNavigator()

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignOutScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AuthStack

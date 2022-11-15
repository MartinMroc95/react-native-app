import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from 'screens/SignIn'
import SignUpScreen from 'screens/SignUp'

const Stack = createNativeStackNavigator()

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AuthStack

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import DetailsScreen from 'screens/Details'
import HomeScreen from 'screens/Home'

const Tab = createBottomTabNavigator()

const UserStack = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
    </Tab.Navigator>
  </NavigationContainer>
)

export default UserStack

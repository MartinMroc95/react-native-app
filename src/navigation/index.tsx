import React from 'react'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import UserStack from './UserStack'
import AuthStack from './AuthStack'

const RootNavigation = () => {
  const { user } = useAuthentication()

  return user ? <UserStack /> : <AuthStack />
}

export default RootNavigation

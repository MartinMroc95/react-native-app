import React from 'react'
import { useAuthentication } from 'utils/hooks/useAuthentication'
import AuthStack from './AuthStack'
import UserStack from './UserStack'

const RootNavigation = () => {
  const { user } = useAuthentication()

  return user ? <UserStack /> : <AuthStack />
}

export default RootNavigation

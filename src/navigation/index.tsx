import React from 'react'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import UserStack from './userStack'
import AuthStack from './authStack'

const RootNavigation = () => {
  const { user } = useAuthentication()

  return user ? <UserStack /> : <AuthStack />
}

export default RootNavigation

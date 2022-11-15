import React from 'react'
import Loading from 'components/Loading'
import { useAuth } from 'providers/AuthProvider'
import AuthStack from './AuthStack'
import UserStack from './UserStack'

const RootNavigation = () => {
  const { userData, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return userData ? <UserStack /> : <AuthStack />
}

export default RootNavigation

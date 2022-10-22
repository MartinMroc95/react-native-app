import React, { createContext, useState, useContext } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth'
import { auth } from 'database'
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextData = {
  authData?: UserCredential
  isLoading: boolean
  signIn: ({ email, password }: { email: string; password: string }) => Promise<void>
  signOut(): void
}

// type AuthData = {
//   token: string
//   email: string
//   name: string
// }

const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [authData, setAuthData] = useState<UserCredential>()

  const loadStorageData = async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData')
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized)
        setAuthData(_authData)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    loadStorageData()
  }, [])

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const _authData = await signInWithEmailAndPassword(auth, email, password)
    setAuthData(_authData)
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData))
  }

  const signOut = async () => {
    setAuthData(undefined)
    await AsyncStorage.removeItem('@AuthData')
  }

  return (
    <AuthContext.Provider value={{ authData, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }

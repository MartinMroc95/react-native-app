import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { auth } from 'database'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'

type AuthContextData = {
  userData?: User | null
  isLoading: boolean
  signIn: (email?: string, password?: string) => Promise<void>
  signOutUser(): Promise<void>
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      try {
        setIsLoading(true)
        if (authUser) {
          setUserData(authUser)
          return
        }
        setUserData(null)
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const signIn = async (email?: string, password?: string) => {
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log('error', error)
      // const err: FirebaseError = error
      // createToast({ intent: 'danger', message: err.message })
    }
  }

  return (
    <AuthContext.Provider value={{ userData, isLoading, signIn, signOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default AuthProvider

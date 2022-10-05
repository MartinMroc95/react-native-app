import React from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../../../firebase'

export const useAuthentication = () => {
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(userData)
      } else {
        // User is signed out
        setUser(undefined)
      }
    })

    return unsubscribeFromAuthStatusChanged
  }, [])

  return {
    user,
  }
}

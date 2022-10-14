import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
// import { FontAwesome } from '@expo/vector-icons'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthentication } from 'utils/hooks/useAuthentication'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // gap: '20px',
    // justifyContent: 'center',
  },
  item: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    // gap: '10px',
  },
  button: {
    marginTop: 10,
  },
})

// const data = [
//   {
//     id: Math.random(),
//     label: 'Podnájom',
//     amount: 350,
//     unit: '€',
//     icon: <FontAwesome name="heartbeat" size={24} color="green" />,
//   },
//   {
//     id: Math.random(),
//     label: 'Podnájom',
//     amount: 350,
//     unit: '€',
//     icon: <FontAwesome name="heartbeat" size={24} color="black" />,
//   },
//   {
//     id: Math.random(),
//     label: 'Podnájom',
//     amount: 350,
//     unit: '€',
//     icon: <FontAwesome name="heartbeat" size={24} color="black" />,
//   },
//   {
//     id: Math.random(),
//     label: 'Podnájom',
//     amount: 350,
//     unit: '€',
//     icon: <FontAwesome name="heartbeat" size={24} color="black" />,
//   },
// ]

const auth = getAuth()

export const HomeScreen: React.FC = () => {
  const { user } = useAuthentication()

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Button
        style={styles.button}
        onPress={() => {
          void signOut(auth)
        }}
      >
        Sign Out
      </Button>
    </View>
  )
}

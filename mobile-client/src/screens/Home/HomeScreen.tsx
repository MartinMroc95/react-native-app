import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { db } from 'database'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base'
import styled from 'styled-components/native'
import * as yup from 'yup'
import { useAuth } from 'providers/AuthProvider'
import CategoryScreen from 'screens/Category'
import DetailsScreen from 'screens/Details'

// const Wrapper = styled(View)`
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: flex-start;
//   padding: 10px;
//   gap: 10px;
// `

const validationScheme = yup
  .object({
    category: yup.string().required('Category is a required field.'),
  })
  .required()

type UserData = {
  id: string
  label: string
  amount: number
  unit: string
  icon: string
  color?: string
  createdAt: string
}[]

const Tab = createBottomTabNavigator()

export function HomeScreen({ navigation }) {
  const auth = useAuth()
  const colRef = collection(db, 'userData')

  const [userData, setUserData] = useState<UserData>([])
  const [formErrors, setFormErrors] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ input: string; category: string }>({
    defaultValues: {
      input: '',
      category: '',
    },
    resolver: yupResolver(validationScheme),
  })

  const fetchData = async () => {
    try {
      const collectionData = await getDocs(colRef)
      const data = collectionData.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      })) as UserData
      const sortedData = data.sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
      setUserData(sortedData)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const onCategorySubmit = async ({ category }: { category: string }) => {
    try {
      if (userData.find((user) => user.label === category)) {
        throw new Error('Category does already exist.')
      }
      await addDoc(colRef, {
        label: category,
        amount: 0,
        unit: '€',
        icon: 'heartbeat',
        color: 'green',
        createdAt: new Date(),
      })
    } catch (error) {
      if (error instanceof Error) {
        setFormErrors(error.message)
      }
    } finally {
      void fetchData()
    }
  }

  console.log('isLoading', isLoading)

  // const onSubmit = ({ input }: { input: string }) => {
  //   const data = userData.filter((user) => user.label === input)
  //   deleteData(data[0].id)
  // }

  useEffect(() => {
    void fetchData()
  }, [])

  // const addData = () => {
  //   void addDoc(colRef, {
  //     label: 'Podnájom Podnájom',
  //     amount: '350',
  //     unit: '€',
  //     icon: 'heartbeat',
  //   }).then(() => {
  //     console.log('DONE')
  //   })
  // }

  // const getData = () => {
  //   void getDocs(colRef).then((snaptshot) => {
  //     const data = snaptshot.docs.map((document) => ({
  //       id: document.id,
  //       ...document.data(),
  //     }))
  //     setUserData(data as UserData)
  //   })
  // }

  // const addSection = () => {
  //   void addDoc(colRef, {
  //     label: 'Podnájom',
  //     amount: '350',
  //     unit: '€',
  //     icon: 'heartbeat',
  //   }).then(() => {
  //     console.log('DONE')
  //   })
  // }

  // const deleteData = (id: string) => {
  //   console.log(id)
  //   const docRef = doc(db, 'userData', id)
  //   console.log('docRef', docRef)
  //   void deleteDoc(docRef)
  //     .then(() => {
  //       console.log('DELETED')
  //     })
  //     .catch((error) => console.log('error', error))
  // }

  console.log('data', userData)

  return (
    <>
      {/* <Tab.Navigator>
        <Tab.Screen name="Category" component={CategoryScreen} />
      </Tab.Navigator> */}
      <Text>Home screen</Text>
      <Button
        onPress={() => {
          void auth.signOutUser()
        }}
      >
        Sign Out
      </Button>
    </>
  )
}

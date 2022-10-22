import { View } from 'native-base'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export const Loading = () => {
  return (
    <View flex={1} justifyContent="center">
      <ActivityIndicator color={'#000'} animating={true} size="small" />
    </View>
  )
}

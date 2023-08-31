import React, { Suspense } from 'react'
import { View } from 'react-native'
import { HomeStackNavigator } from './StackNavigator'

const AppNavigator = () => {
  return (
    <Suspense>
      <View style={{ width: '100%', flex: 1 }}>
        <HomeStackNavigator />
      </View>
    </Suspense>
  )
}

export default AppNavigator

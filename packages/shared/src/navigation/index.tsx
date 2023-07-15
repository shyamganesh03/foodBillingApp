import React, { Suspense } from 'react'
import { HomeStackNavigator } from './StackNavigator'
import { View } from 'react-native'

const AppNavigator = () => {
  return (
    <Suspense>
      <View style={{ width: '100%', backgroundColor: 'red', flex: 1 }}>
        <HomeStackNavigator />
      </View>
    </Suspense>
  )
}

export default AppNavigator

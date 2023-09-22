import React, { Suspense } from 'react'
import { View } from 'react-native'
import { HomeStackNavigator } from './StackNavigator'
import { LeftContainer } from '../components'
import { LeftTimeLineData } from '../constants/left-timeline-data'

const AppNavigator = () => {
  return (
    <Suspense>
      <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
        <LeftContainer tabItems={LeftTimeLineData} />
        <HomeStackNavigator />
      </View>
    </Suspense>
  )
}

export default AppNavigator

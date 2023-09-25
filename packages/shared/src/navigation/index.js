import React, { Suspense } from 'react'
import { View } from 'react-native'
import { HomeStackNavigator } from './StackNavigator'
import { LeftContainer } from '../components'
import { LeftTimeLineData } from '../constants/left-timeline-data'
import { useParams } from '@libs/utils'

const AppNavigator = () => {
  const { params } = useParams()

  return (
    <Suspense>
      <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
        {!!params?.steps ? <LeftContainer tabItems={LeftTimeLineData} /> : null}
        <HomeStackNavigator />
      </View>
    </Suspense>
  )
}

export default AppNavigator

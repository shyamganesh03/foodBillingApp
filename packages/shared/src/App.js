import React, { useRef } from 'react'
import AppNavigator from './navigation'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './navigation/RootNavigator'
import { Amplify } from 'aws-amplify'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { View, useWindowDimensions } from 'react-native'
import awsConfig from '../awsConfig'
import DashBoard from './screens/dashboard'

const App = () => {
  const routeNameRef = useRef()
  Amplify.configure(awsConfig)
  const height = useWindowDimensions().height

  // return (
  //   <SafeAreaProvider initialMetrics={initialWindowMetrics}>
  //     <NavigationContainer
  //       ref={navigationRef}
  //       onReady={() =>
  //         (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
  //       }
  //       onStateChange={async () => {
  //         const currentRouteName = navigationRef.current.getCurrentRoute().name
  //         routeNameRef.current = currentRouteName
  //       }}
  //       linking={{ enabled: true }}
  //     >
  //       <View style={{ minHeight: height }}>
  //         <AppNavigator />
  //       </View>
  //     </NavigationContainer>
  //   </SafeAreaProvider>
  // )
  return <DashBoard />
}

export default App

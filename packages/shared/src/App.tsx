import React, { useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './navigation/RootNavigator'
import { Amplify } from 'aws-amplify'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { View, useWindowDimensions, Dimensions } from 'react-native'
import awsConfig from '../awsConfig'
import AppNavigator from './navigation'

const App: React.FC = () => {
  const routeNameRef = useRef<string | undefined>()
  Amplify.configure(awsConfig)
  const height = useWindowDimensions().height

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current =
            navigationRef.current?.getCurrentRoute()?.name)
        }
        onStateChange={async () => {
          const currentRouteName =
            navigationRef.current?.getCurrentRoute()?.name
          routeNameRef.current = currentRouteName
        }}
        linking={{
          enabled: true,
          prefixes: [], // Specify your custom prefixes here
        }}
      >
        <View style={{ minHeight: height }}>
          <AppNavigator />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App

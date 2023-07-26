import React, { useRef } from 'react'
import * as Sentry from '@sentry/react-native'
import AppNavigator from './navigation'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './navigation/RootNavigator'
import { Amplify } from 'aws-amplify'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Platform, View, useWindowDimensions } from 'react-native'
import awsConfig from '../awsConfig'
import DashBoard from './screens/dashboard'
import { sentryUrl } from './config'

Sentry.init({
  dsn: sentryUrl,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

const App = () => {
  const routeNameRef = useRef()
  Amplify.configure(awsConfig)
  const height = useWindowDimensions().height

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={async () => {
          const currentRouteName = navigationRef.current.getCurrentRoute().name
          routeNameRef.current = currentRouteName
        }}
        linking={{ enabled: true }}
      >
        <View style={{ minHeight: height }}>
          <AppNavigator />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

Sentry.setTag('Platform:', Platform.OS)

export default Sentry.withProfiler(App)

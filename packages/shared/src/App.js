import React, { useRef } from 'react'
import * as Sentry from '@sentry/react-native'
import AppNavigator from './navigation'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { navigationRef } from './navigation/RootNavigator'
import { Amplify } from 'aws-amplify'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Platform, View, useWindowDimensions } from 'react-native'
import awsConfig from '../awsConfig'
import { sentryUrl } from './config'
import { appTheme } from './utils/atom'

Sentry.init({
  dsn: sentryUrl,
  tracesSampleRate: 1.0,
})

const customLightTheme = {
  ...DefaultTheme.colors,
  colors: {
    ...DefaultTheme.colors,
  },
}

const customDarkTheme = {
  ...DarkTheme.colors,
  colors: {
    ...DarkTheme.colors,
  },
}

const getThemeColor = (themeState) => {
  if (themeState === 'dark') {
    return customDarkTheme
  }
  return customLightTheme
}

const App = () => {
  Amplify.configure(awsConfig)

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <JotaiProvider>
        <AppSubWrapper />
      </JotaiProvider>
    </SafeAreaProvider>
  )
}

const AppSubWrapper = () => {
  const routeNameRef = useRef()
  const height = useWindowDimensions().height
  const [themeState] = useAtom(appTheme)
  const theme = getThemeColor(themeState)
  return (
    <View style={{ minHeight: height }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        theme={theme}
        onStateChange={async () => {
          const currentRouteName = navigationRef.current.getCurrentRoute().name
          routeNameRef.current = currentRouteName
        }}
        linking={{ enabled: true }}
      >
        <AppNavigator />
      </NavigationContainer>
    </View>
  )
}

Sentry.setTag('Platform:', Platform.OS)

export default Sentry.withProfiler(App)

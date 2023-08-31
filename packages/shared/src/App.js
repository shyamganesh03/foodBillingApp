import React, { useRef } from 'react'
import { Platform, View, useWindowDimensions } from 'react-native'
import * as Sentry from '@sentry/react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Amplify } from 'aws-amplify'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import 'react-native-gesture-handler'
import { Provider as JotaiProvider } from 'jotai'
import {
  DarkTheme as DarkThemeColors,
  LightTheme as LightThemeColors,
  ThemeContext,
  spacing,
} from '@libs/theme'
import { navigationRef } from './navigation/RootNavigator'
import AppNavigator from './navigation'
import awsConfig from './awsConfig'
import { sentryUrl } from './config'
// import './translations/i18n'

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
  const { height } = useWindowDimensions()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  const customLightTheme = {
    ...DefaultTheme.colors,
    ...LightThemeColors,
    colors: {
      ...DefaultTheme.colors,
      ...LightThemeColors.colors,
    },
    spacing,
  }

  const customDarkTheme = {
    ...DefaultTheme.colors,
    ...DarkThemeColors,
    colors: {
      ...DefaultTheme.colors,
      ...DarkThemeColors.colors,
    },
    spacing,
  }

  const getThemeColor = (theme) => {
    if (theme === 'dark') {
      return customDarkTheme
    }
    if (theme === 'light') {
      return customLightTheme
    }
    return customDarkTheme
  }

  const theme = getThemeColor('light')

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name
          }}
          onStateChange={async () => {
            const currentRouteName =
              navigationRef.current.getCurrentRoute().name
            routeNameRef.current = currentRouteName
          }}
          linking={{ enabled: true }}
          theme={theme}
        >
          <ThemeContext.Provider value={theme}>
            <PaperProvider>
              <JotaiProvider>
                <View style={{ minHeight: height }}>
                  <AppNavigator />
                </View>
              </JotaiProvider>
            </PaperProvider>
          </ThemeContext.Provider>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

Sentry.setTag('Platform:', Platform.OS)

export default Sentry.withProfiler(App)

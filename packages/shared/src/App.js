import React, { useEffect, useRef } from 'react'
import { Platform, View, useWindowDimensions } from 'react-native'
import * as Sentry from '@sentry/react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Amplify } from 'aws-amplify'
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import 'react-native-gesture-handler'
import { Provider as JotaiProvider } from 'jotai'
import Toast from 'react-native-toast-notifications'
import { useForm, FormProvider } from 'react-hook-form'
import {
  DarkTheme as DarkThemeColors,
  LightTheme as LightThemeColors,
  ThemeContext,
  spacing,
} from '@libs/theme'
import { navigationRef } from './navigation/RootNavigator'
import AppNavigator from './navigation'
import awsConfig from './awsConfig'
import { r3AppUrl, sentryUrl } from './config'
import { ParamsProvider, SecureStore } from '@libs/utils'
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
  const methods = useForm()
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

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`${r3AppUrl}/config.json`)
      const result = await response.json()
      await SecureStore.setItemAsync('config', JSON.stringify(result))
    })()
  }, [])

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
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
                <ParamsProvider>
                  <FormProvider {...methods}>
                    <View style={{ minHeight: height }}>
                      <AppNavigator />
                    </View>
                  </FormProvider>
                </ParamsProvider>
              </JotaiProvider>
            </PaperProvider>
          </ThemeContext.Provider>
          <Toast
            ref={(ref) => (global.toast = ref)}
            duration={5000}
            animationType="zoom-in"
            animationDuration={0}
            textStyle={{ fontSize: 16 }}
            renderType={{
              error: (toast) => <ErrorToast toast={toast} />,
            }}
          />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

Sentry.setTag('Platform:', Platform.OS)

export default Sentry.withProfiler(App)

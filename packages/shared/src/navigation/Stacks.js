import React from 'react'
import Application from '../screens/applicationScreen'
import ThankYouScreen from '../screens/thankyouScreen'

export const Stacks = (Stack) => (
  <Stack.Group
    initialRouteName="application"
    screenOptions={{
      title: '',
    }}
  >
    <Stack.Screen name="application" options={{ headerShown: false }}>
      {(screenProps) => <Application {...screenProps} />}
    </Stack.Screen>
    <Stack.Screen name="success" options={{ headerShown: false }}>
      {(screenProps) => <ThankYouScreen {...screenProps} />}
    </Stack.Screen>
  </Stack.Group>
)

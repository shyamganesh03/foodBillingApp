import React from 'react'
import Application from '../screens/applicationScreen'

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
  </Stack.Group>
)

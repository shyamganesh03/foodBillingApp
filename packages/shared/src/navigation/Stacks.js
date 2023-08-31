import React from 'react'
import Registration from '../screens/registrationScreen'

export const Stacks = (Stack) => (
  <Stack.Group
    initialRouteName="registration"
    screenOptions={{
      title: '',
    }}
  >
    <Stack.Screen name="registration" options={{ headerShown: false }}>
      {(screenProps) => <Registration {...screenProps} />}
    </Stack.Screen>
  </Stack.Group>
)

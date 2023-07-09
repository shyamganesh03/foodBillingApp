import React from 'react'
import DashBoard from '../screens/dashboard'

export const Stacks = (Stack) => {
  return (
    <Stack.Group initialRouteName="home">
      <Stack.Screen name="home">
        {(screenProps) => <DashBoard {...screenProps} />}
      </Stack.Screen>
    </Stack.Group>
  )
}

import React from 'react'
import DashBoard from '../screens/dashboard'

export const Stacks = (Stack: any): JSX.Element => {
  return (
    <Stack.Group initialRouteName="home">
      <Stack.Screen name="home">
        {(screenProps: any) => <DashBoard {...screenProps} />}
      </Stack.Screen>
    </Stack.Group>
  )
}

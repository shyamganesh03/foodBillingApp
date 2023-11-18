import React from 'react'
import Login from '../screens/logIn'
import AddUser from '../screens/addUser'
import TabNavigator from "./TabNavigator"

const screenOptions = {
  title: '',
}

export const Stacks = (Stack) => (
  <Stack.Group initialRouteName="application" screenOptions={screenOptions}>
    <Stack.Screen name="login" options={{ headerShown: false }}>
      {(screenProps) => <Login {...screenProps} />}
    </Stack.Screen>
    <Stack.Screen name="dashboard" options={{ headerShown: false }}>
      {(screenProps) => <TabNavigator {...screenProps} />}
    </Stack.Screen>
  </Stack.Group>
)

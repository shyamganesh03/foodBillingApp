import React from 'react'
import Login from '../screens/logIn'
import AddUser from '../screens/addUser'

const screenOptions = {
  title: '',
}

export const Stacks = (Stack) => (
  <Stack.Group initialRouteName="application" screenOptions={screenOptions}>
    <Stack.Screen name="login" options={{ headerShown: false }}>
      {(screenProps) => <Login {...screenProps} />}
    </Stack.Screen>
    <Stack.Screen name="signUp" options={{ headerShown: false }}>
      {(screenProps) => <AddUser {...screenProps} />}
    </Stack.Screen>
  </Stack.Group>
)

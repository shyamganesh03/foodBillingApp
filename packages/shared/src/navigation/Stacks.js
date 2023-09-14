import React from 'react'
import Application from '../screens/application'
import ThankYouScreen from '../screens/success'
import { Header } from '../components'

const screenOptions = {
  headerLeft: (props) => <Header title="GUS Medical Universities" />,
  title: '',
}

export const Stacks = (Stack) => (
  <Stack.Group initialRouteName="application" screenOptions={screenOptions}>
    <Stack.Screen name="application">
      {(screenProps) => <Application {...screenProps} />}
    </Stack.Screen>
    <Stack.Screen name="success" options={{ headerShown: false }}>
      {(screenProps) => <ThankYouScreen {...screenProps} />}
    </Stack.Screen>
  </Stack.Group>
)

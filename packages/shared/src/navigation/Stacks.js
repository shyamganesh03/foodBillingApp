import React from 'react'
import Application from '../screens/applicationScreen'
import ThankYouScreen from '../screens/thankyouScreen'
import { Header } from '../components'

const screenOptions = {
  headerLeft: (props) => <Header title="Saba university school of medicine" />,
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

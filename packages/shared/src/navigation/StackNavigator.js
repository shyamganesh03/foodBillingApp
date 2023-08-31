import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Stacks } from './Stacks'

const Stack = createNativeStackNavigator()

const ScreenOptions = {}

const createNavigators = (initialRouteName) => (
  <Stack.Navigator
    initialRouteName={initialRouteName}
    screenOptions={ScreenOptions}
  >
    {(() => Stacks(Stack))()}
  </Stack.Navigator>
)

export const HomeStackNavigator = () => createNavigators('login')

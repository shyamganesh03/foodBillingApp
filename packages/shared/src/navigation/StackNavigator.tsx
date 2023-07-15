import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Stacks } from './Stacks'

const Stack = createNativeStackNavigator()

const createNavigators = (initialRouteName: string): JSX.Element => (
  <Stack.Navigator initialRouteName={initialRouteName}>
    {(() => Stacks(Stack))()}
  </Stack.Navigator>
)

export const HomeStackNavigator: React.FC = (): JSX.Element =>
  createNavigators('home')

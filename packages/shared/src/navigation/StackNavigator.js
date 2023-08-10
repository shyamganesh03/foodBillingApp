import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Stacks } from './Stacks'
import ThemeSwitcher from '../components/themeSwitcher'

const Stack = createNativeStackNavigator()

const ScreenOptions = {
  headerRight: () => <ThemeSwitcher />,
  headerStyle: {
    borderBottomWidth: 1,
    shadowColor: 'transparent',
    height: 76,
  },
}

const createNavigators = (initialRouteName) => (
  <Stack.Navigator
    initialRouteName={initialRouteName}
    screenOptions={ScreenOptions}
  >
    {(() => Stacks(Stack))()}
  </Stack.Navigator>
)

export const HomeStackNavigator = () => createNavigators('home')

import React from 'react'
import { Header } from '../components'

const screenOptions = {
  headerLeft: (props) => <Header title="GUS Medical Universities" />,
  title: '',
}

export const Stacks = (Stack) => (
  <Stack.Group
    initialRouteName="application"
    screenOptions={screenOptions}
  ></Stack.Group>
)

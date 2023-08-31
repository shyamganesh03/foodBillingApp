import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

const Divider = (props) => {
  const { style } = props
  const { colors } = useTheme()
  return (
    <View
      style={StyleSheet.flatten([
        {
          height: 2,
          backgroundColor: '#D4D4D4',
          width: '100%',
        },
        style,
      ])}
    />
  )
}

export default Divider

import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from '@libs/components'

const LinkText = ({ title = '', onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Text variant="body1">{title}</Text>
    </TouchableOpacity>
  )
}

export default LinkText

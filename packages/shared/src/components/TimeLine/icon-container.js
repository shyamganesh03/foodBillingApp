import React from 'react'
import { Icon } from '@r3-oaf/native-icons'
import { View } from 'react-native'

export const IconContainer = ({
  status,
  currentActiveIndex,
  index,
  colors,
}) => {
  if (currentActiveIndex === index + 1) {
    return (
      <View style={{ width: 25 }}>
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: colors.white,
            borderRadius: 7.5,
          }}
        />
      </View>
    )
  }
  if (currentActiveIndex !== index + 1 && status !== 'completed') {
    return (
      <View style={{ width: 25 }}>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: colors.white,
            borderRadius: 5,
            marginLeft: 2,
            // opacity: 0.5,
          }}
        />
      </View>
    )
  }
  if (status === 'completed') {
    return (
      <View style={{ width: 25 }}>
        <Icon name="Check" height={20} width={20} color={colors.white} />
      </View>
    )
  }
}

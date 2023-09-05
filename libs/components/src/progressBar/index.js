import { Animated, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Text } from '@libs/components'
import { useTheme } from '@react-navigation/native'

const ProgressBar = ({
  progressBarStyle = {},
  percentage = 0,
  hideTitle = false,
}) => {
  const { colors } = useTheme()
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }, [percentage])
  return (
    <View style={progressBarStyle}>
      <View
        style={{
          height: 10,
          backgroundColor: colors.fieldBorder,
          borderRadius: 5,
          width: 100,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: 10,
            backgroundColor: colors.primary,
            width: animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>
    </View>
  )
}

export default ProgressBar
